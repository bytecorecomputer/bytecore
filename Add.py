import tkinter as tk
from tkinter import ttk, messagebox
import json
import os
import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
from ttkthemes import ThemedTk

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

    def save_data(self):
        with open(self.filename, "w") as f:
            json.dump(self.data, f, indent=4)

    def add_or_update_student(self, roll, name, course, total, remaining):
        self.data[roll] = {
            "name": name,
            "course": course,
            "total": int(total),
            "remaining": int(remaining),
            "date": datetime.now().strftime("%Y-%m-%d")
        }
        self.save_data()

    def get_all_students(self):
        return self.data.items()

    def export_to_excel(self, filename="FeeData.xlsx"):
        df = pd.DataFrame(self.data).T
        df.index.name = "Roll No"
        df.to_excel(filename)

class FeeManagerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("📘 Bytecore Fee Manager - Advanced")
        self.root.geometry("1000x600")
        self.root.configure(bg="#1e1e2f")

        self.manager = FeeManager()
        self.create_ui()
        self.load_table()

    def create_ui(self):
        style = ttk.Style()
        style.configure("TLabel", foreground="white", background="#1e1e2f", font=("Segoe UI", 10))
        style.configure("TButton", font=("Segoe UI", 10, "bold"))

        labels = ["Roll No", "Name", "Course", "Total Fee", "Remaining Fee"]
        self.entries = {}

        for i, label in enumerate(labels):
            ttk.Label(self.root, text=label + ":").grid(row=i, column=0, padx=10, pady=5, sticky="e")
            entry = ttk.Entry(self.root, width=30)
            entry.grid(row=i, column=1, padx=10, pady=5, sticky="w")
            self.entries[label.lower().replace(" ", "_")] = entry

        ttk.Button(self.root, text="📂 Add / Update", command=self.add).grid(row=0, column=2, padx=20)
        ttk.Button(self.root, text="📤 Export to Excel", command=self.export).grid(row=1, column=2, padx=20)
        ttk.Button(self.root, text="📊 Show Graph", command=self.show_graph).grid(row=2, column=2, padx=20)

        ttk.Label(self.root, text="🔍 Search:").grid(row=5, column=0, padx=10, pady=5, sticky="e")
        self.search_var = tk.StringVar()
        self.search_var.trace_add("write", self.search_student)
        search_entry = ttk.Entry(self.root, textvariable=self.search_var, width=30)
        search_entry.grid(row=5, column=1, padx=10, pady=5, sticky="w")

        columns = ("Roll No", "Name", "Course", "Total", "Remaining", "Date")
        self.tree = ttk.Treeview(self.root, columns=columns, show="headings", height=15)
        for col in columns:
            self.tree.heading(col, text=col)
            self.tree.column(col, anchor="center")

        self.tree.grid(row=6, column=0, columnspan=3, padx=20, pady=20, sticky="nsew")
        self.tree.bind("<<TreeviewSelect>>", self.on_tree_select)

        self.root.grid_rowconfigure(6, weight=1)
        self.root.grid_columnconfigure(2, weight=1)

    def add(self):
        roll = self.entries["roll_no"].get().strip()
        name = self.entries["name"].get().strip()
        course = self.entries["course"].get().strip()
        total = self.entries["total_fee"].get().strip()
        remaining = self.entries["remaining_fee"].get().strip()

        if not all([roll, name, course, total, remaining]):
            messagebox.showwarning("Missing Info", "Please fill all fields.")
            return

        self.manager.add_or_update_student(roll, name, course, total, remaining)
        self.load_table()
        messagebox.showinfo("Success", f"Student '{name}' saved successfully.")
        self.clear_fields()

    def clear_fields(self):
        for entry in self.entries.values():
            entry.delete(0, tk.END)

    def load_table(self):
        for item in self.tree.get_children():
            self.tree.delete(item)
        for roll, info in self.manager.get_all_students():
            self.tree.insert("", "end", values=(roll, info["name"], info["course"], info["total"], info["remaining"], info.get("date", "")))

    def export(self):
        self.manager.export_to_excel()
        messagebox.showinfo("Exported", "Data exported to FeeData.xlsx")

    def show_graph(self):
        total = []
        remaining = []
        names = []

        for roll, info in self.manager.get_all_students():
            names.append(info["name"])
            total.append(info["total"])
            remaining.append(info["remaining"])

        plt.figure(figsize=(10, 5))
        plt.bar(names, total, label="Total", color="skyblue")
        plt.bar(names, remaining, label="Remaining", color="orange", bottom=[t - r for t, r in zip(total, remaining)])
        plt.title("Total vs Remaining Fee")
        plt.ylabel("Amount")
        plt.xlabel("Students")
        plt.xticks(rotation=45)
        plt.legend()
        plt.tight_layout()
        plt.show()

    def on_tree_select(self, event):
        selected_item = self.tree.focus()
        if not selected_item:
            return
        values = self.tree.item(selected_item)["values"]
        if len(values) >= 6:
            self.entries["roll_no"].delete(0, tk.END)
            self.entries["roll_no"].insert(0, values[0])
            self.entries["name"].delete(0, tk.END)
            self.entries["name"].insert(0, values[1])
            self.entries["course"].delete(0, tk.END)
            self.entries["course"].insert(0, values[2])
            self.entries["total_fee"].delete(0, tk.END)
            self.entries["total_fee"].insert(0, values[3])
            self.entries["remaining_fee"].delete(0, tk.END)
            self.entries["remaining_fee"].insert(0, values[4])

    def search_student(self, *args):
        keyword = self.search_var.get().lower()
        for item in self.tree.get_children():
            self.tree.delete(item)

        for roll, info in self.manager.get_all_students():
            name = info["name"].lower()
            if keyword in roll.lower() or keyword in name:
                self.tree.insert("", "end", values=(roll, info["name"], info["course"], info["total"], info["remaining"], info.get("date", "")))


def open_main_app():
    root = ThemedTk(theme="arc")
    FeeManagerApp(root)
    root.mainloop()

if __name__ == "__main__":
    open_main_app()
