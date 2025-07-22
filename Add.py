import json
import os
import tkinter as tk
from tkinter import messagebox, ttk

FILENAME = "Fee.json"

class FeeManager:
    def __init__(self, filename=FILENAME):
        self.filename = filename
        self.data = {}
        self.load_data()

    def load_data(self):
        if os.path.exists(self.filename):
            with open(self.filename, "r") as f:
                self.data = json.load(f)
        else:
            self.data = {}
            self.save_data()

    def save_data(self):
        with open(self.filename, "w") as f:
            json.dump(self.data, f, indent=4)

    def add_entry(self, roll, name, course, total, remaining):
        if roll in self.data:
            return False, "Roll number already exists."
        self.data[roll] = {"name": name, "course": course, "total": total, "remaining": remaining}
        self.save_data()
        return True, "Entry added successfully."

    def update_entry(self, roll, name, course, total, remaining):
        if roll not in self.data:
            return False, "Roll number not found."
        self.data[roll] = {"name": name, "course": course, "total": total, "remaining": remaining}
        self.save_data()
        return True, "Entry updated successfully."

    def delete_entry(self, roll):
        if roll in self.data:
            del self.data[roll]
            self.save_data()
            return True, "Entry deleted successfully."
        return False, "Roll number not found."

    def search_entry_by_roll(self, roll):
        return self.data.get(roll, None)

    def search_entry_by_name(self, name):
        return {roll: info for roll, info in self.data.items() if info["name"].lower() == name.lower()}

    def get_all(self):
        return self.data

    def get_total_sum(self):
        return sum(entry['total'] for entry in self.data.values())

    def get_remaining_sum(self):
        return sum(entry['remaining'] for entry in self.data.values())

class FeeManagerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Bytecore Fee Management System")
        self.root.geometry("1150x720")
        self.root.config(bg="#e9f5ff")
        self.manager = FeeManager()
        self.create_ui()
        self.show_all()

    def create_ui(self):
        tk.Label(self.root, text="Bytecore Fee Management System", font=("Segoe UI", 26, "bold"),
                 bg="#e9f5ff", fg="#1a1a1a").pack(pady=20)

        form_frame = tk.Frame(self.root, bg="#ffffff", bd=3, relief="ridge")
        form_frame.pack(pady=10, padx=20, fill="x")

        labels = ["Roll No.", "Name", "Course", "Total Fee", "Remaining Fee"]
        self.entries = {}

        for i, text in enumerate(labels):
            tk.Label(form_frame, text=text, font=("Segoe UI", 12, "bold"), bg="#ffffff").grid(row=i, column=0, sticky="w", padx=10, pady=5)
            entry = tk.Entry(form_frame, font=("Segoe UI", 12), width=40, relief="solid", bd=1)
            entry.grid(row=i, column=1, padx=10, pady=5)
            self.entries[text.lower()] = entry

        btn_frame = tk.Frame(self.root, bg="#e9f5ff")
        btn_frame.pack(pady=10)

        style = {"font": ("Segoe UI", 11, "bold"), "bg": "#0066cc", "fg": "white", "relief": "raised", "bd": 2}

        buttons = [
            ("Add", self.add),
            ("Update", self.update),
            ("Delete", self.delete),
            ("Search (Roll)", self.search_by_roll),
            ("Search (Name)", self.search_by_name),
            ("Show All", self.show_all),
            ("Clear", self.clear)
        ]

        for i, (text, command) in enumerate(buttons):
            tk.Button(btn_frame, text=text, width=14, command=command, **style).grid(row=0, column=i, padx=8)

        self.tree = ttk.Treeview(self.root, columns=("roll", "name", "course", "total", "remaining"), show="headings")
        for col in self.tree["columns"]:
            self.tree.heading(col, text=col.capitalize())
            self.tree.column(col, width=200, anchor="center")

        style_tree = ttk.Style()
        style_tree.configure("Treeview.Heading", font=("Segoe UI", 11, "bold"))
        style_tree.configure("Treeview", font=("Segoe UI", 10), rowheight=28)
        self.tree.pack(padx=20, pady=10, fill="both", expand=True)

        # ✅ Treeview Row Click Bind
        self.tree.bind("<<TreeviewSelect>>", self.on_row_select)

        self.total_label = tk.Label(self.root, text="Total Fee: ₹0 | Remaining: ₹0",
                                    font=("Segoe UI", 14, "bold"), bg="#e9f5ff", fg="#333")
        self.total_label.pack(pady=10)

    def on_row_select(self, event):
        selected = self.tree.selection()
        if selected:
            values = self.tree.item(selected[0], 'values')
            self.entries["roll no."].delete(0, tk.END)
            self.entries["roll no."].insert(0, values[0])
            self.entries["name"].delete(0, tk.END)
            self.entries["name"].insert(0, values[1])
            self.entries["course"].delete(0, tk.END)
            self.entries["course"].insert(0, values[2])
            self.entries["total fee"].delete(0, tk.END)
            self.entries["total fee"].insert(0, values[3])
            self.entries["remaining fee"].delete(0, tk.END)
            self.entries["remaining fee"].insert(0, values[4])

    def get_inputs(self):
        try:
            roll = self.entries["roll no."].get().strip()
            name = self.entries["name"].get().strip()
            course = self.entries["course"].get().strip()
            total = int(self.entries["total fee"].get().strip())
            remaining = int(self.entries["remaining fee"].get().strip())
            return roll, name, course, total, remaining
        except ValueError:
            messagebox.showerror("Error", "Total and Remaining fees must be numbers.")
            return None

    def add(self):
        inputs = self.get_inputs()
        if inputs:
            success, msg = self.manager.add_entry(*inputs)
            messagebox.showinfo("Info", msg)
            self.clear()
            self.show_all()

    def update(self):
        inputs = self.get_inputs()
        if inputs:
            success, msg = self.manager.update_entry(*inputs)
            messagebox.showinfo("Info", msg)
            self.clear()
            self.show_all()

    def delete(self):
        roll = self.entries["roll no."].get().strip()
        if not roll:
            messagebox.showwarning("Warning", "Enter a roll number.")
            return
        success, msg = self.manager.delete_entry(roll)
        messagebox.showinfo("Info", msg)
        self.clear()
        self.show_all()

    def search_by_roll(self):
        roll = self.entries["roll no."].get().strip()
        self.tree.delete(*self.tree.get_children())
        data = self.manager.search_entry_by_roll(roll)
        if data:
            self.tree.insert("", "end", values=(roll, data["name"], data["course"], data["total"], data["remaining"]))
        else:
            messagebox.showinfo("Not Found", "No data found for this roll number.")

    def search_by_name(self):
        name = self.entries["name"].get().strip()
        self.tree.delete(*self.tree.get_children())
        results = self.manager.search_entry_by_name(name)
        if results:
            for roll, data in results.items():
                self.tree.insert("", "end", values=(roll, data["name"], data["course"], data["total"], data["remaining"]))
        else:
            messagebox.showinfo("Not Found", "No data found with this name.")

    def show_all(self):
        self.tree.delete(*self.tree.get_children())
        for roll, info in self.manager.get_all().items():
            self.tree.insert("", "end", values=(roll, info["name"], info["course"], info["total"], info["remaining"]))
        self.update_totals()

    def update_totals(self):
        total = self.manager.get_total_sum()
        remaining = self.manager.get_remaining_sum()
        self.total_label.config(text=f"Total Fee: ₹{total} | Remaining: ₹{remaining}")

    def clear(self):
        for entry in self.entries.values():
            entry.delete(0, tk.END)
        self.tree.delete(*self.tree.get_children())
        self.update_totals()

def main():
    root = tk.Tk()
    app = FeeManagerApp(root)
    root.mainloop()

main()
