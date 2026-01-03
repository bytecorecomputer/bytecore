import tkinter as tk
from tkinter import ttk, messagebox
import json
import os
import pandas as pd
from datetime import datetime
import matplotlib.pyplot as plt
from ttkthemes import ThemedTk

FILENAME = "Fee.json"
JS_FILENAME = "assets/js/fee-data.js"
DIPLOMA_FILENAME = "Diploma.json"
DIPLOMA_JS_FILENAME = "assets/js/diploma-data.js"

class DataManager:
    def __init__(self, fee_file=FILENAME, diploma_file=DIPLOMA_FILENAME):
        self.fee_file = fee_file
        self.diploma_file = diploma_file
        self.fee_data = {}
        self.diploma_data = {"certificates": []}
        self.load_data()

    def load_data(self):
        # Load Fee Data
        if os.path.exists(self.fee_file):
            with open(self.fee_file, "r") as f:
                self.fee_data = json.load(f)
        
        # Load Diploma Data
        if os.path.exists(self.diploma_file):
            with open(self.diploma_file, "r") as f:
                self.diploma_data = json.load(f)

    def save_fee_data(self):
        with open(self.fee_file, "w") as f:
            json.dump(self.fee_data, f, indent=4)
        try:
            os.makedirs(os.path.dirname(JS_FILENAME), exist_ok=True)
            with open(JS_FILENAME, "w") as f:
                f.write(f"const feeData = {json.dumps(self.fee_data, indent=4)};")
        except Exception as e: print(f"Error saving Fee JS: {e}")

    def save_diploma_data(self):
        with open(self.diploma_file, "w") as f:
            json.dump(self.diploma_data, f, indent=4)
        try:
            os.makedirs(os.path.dirname(DIPLOMA_JS_FILENAME), exist_ok=True)
            with open(DIPLOMA_JS_FILENAME, "w") as f:
                f.write(f"const diplomaData = {json.dumps(self.diploma_data, indent=4)};")
        except Exception as e: print(f"Error saving Diploma JS: {e}")

    def add_fee(self, roll, name, course, total, remaining):
        self.fee_data[roll] = {
            "name": name, "course": course,
            "total": int(total), "remaining": int(remaining),
            "date": datetime.now().strftime("%Y-%m-%d")
        }
        self.save_fee_data()

    def add_diploma(self, roll, dob, link):
        # Update if exists, else append
        found = False
        for cert in self.diploma_data["certificates"]:
            if cert["roll"] == roll:
                cert["dob"] = dob
                cert["link"] = link
                found = True
                break
        if not found:
            self.diploma_data["certificates"].append({"roll": roll, "dob": dob, "link": link})
        self.save_diploma_data()

class BytecoreManagerApp:
    def __init__(self, root):
        self.root = root
        self.root.title("🚀 Bytecore Advanced Manager")
        self.root.geometry("1100x700")
        self.root.configure(bg="#0f172a")

        self.manager = DataManager()
        
        # Style
        self.style = ttk.Style()
        self.style.theme_use('clam')
        self.style.configure("TNotebook", background="#0f172a", borderwidth=0)
        self.style.configure("TNotebook.Tab", background="#1e293b", foreground="white", padding=[20, 10], font=("Segoe UI", 10, "bold"))
        self.style.map("TNotebook.Tab", background=[("selected", "#7464eb")])
        self.style.configure("Treeview", background="#1e293b", foreground="white", fieldbackground="#1e293b", borderwidth=0)
        self.style.map("Treeview", background=[("selected", "#7464eb")])

        self.notebook = ttk.Notebook(self.root)
        self.notebook.pack(fill="both", expand=True, padx=10, pady=10)

        # Tabs
        self.fee_tab = tk.Frame(self.notebook, bg="#0f172a")
        self.diploma_tab = tk.Frame(self.notebook, bg="#0f172a")

        self.notebook.add(self.fee_tab, text=" 💰 Fee Management ")
        self.notebook.add(self.diploma_tab, text=" 🎓 Diploma Management ")

        self.create_fee_ui()
        self.create_diploma_ui()
        self.load_fee_table()
        self.load_diploma_table()

    def create_fee_ui(self):
        top_frame = tk.Frame(self.fee_tab, bg="#0f172a")
        top_frame.pack(pady=20)

        labels = ["Roll No", "Name", "Course", "Total Fee", "Remaining Fee"]
        self.fee_entries = {}

        for i, label in enumerate(labels):
            tk.Label(top_frame, text=label+":", fg="white", bg="#0f172a", font=("Segoe UI", 10)).grid(row=i, column=0, padx=10, pady=5, sticky="e")
            entry = ttk.Entry(top_frame, width=30)
            entry.grid(row=i, column=1, padx=10, pady=5)
            self.fee_entries[label.lower().replace(" ", "_")] = entry

        btn_frame = tk.Frame(top_frame, bg="#0f172a")
        btn_frame.grid(row=0, column=2, rowspan=5, padx=30)
        
        ttk.Button(btn_frame, text="✅ Save / Update", command=self.save_fee).pack(fill="x", pady=5)
        ttk.Button(btn_frame, text="📊 Show Data Graph", command=self.show_fee_graph).pack(fill="x", pady=5)
        ttk.Button(btn_frame, text="🔍 Search", command=self.load_fee_table).pack(fill="x", pady=5)

        cols = ("Roll", "Name", "Course", "Total", "Remaining", "Date")
        self.fee_tree = ttk.Treeview(self.fee_tab, columns=cols, show="headings")
        for c in cols: self.fee_tree.heading(c, text=c); self.fee_tree.column(c, width=150, anchor="center")
        self.fee_tree.pack(fill="both", expand=True, padx=20, pady=20)
        self.fee_tree.bind("<<TreeviewSelect>>", self.on_fee_select)

    def create_diploma_ui(self):
        top_frame = tk.Frame(self.diploma_tab, bg="#0f172a")
        top_frame.pack(pady=20)

        labels = ["Roll No", "Date of Birth", "Certificate Link (URL)"]
        self.dip_entries = {}

        for i, label in enumerate(labels):
            tk.Label(top_frame, text=label+":", fg="white", bg="#0f172a", font=("Segoe UI", 10)).grid(row=i, column=0, padx=10, pady=5, sticky="e")
            entry = ttk.Entry(top_frame, width=40)
            entry.grid(row=i, column=1, padx=10, pady=5)
            self.dip_entries[label.lower().replace(" ", "_")] = entry

        ttk.Button(top_frame, text="🚀 Add Certificate", command=self.save_diploma).grid(row=0, column=2, rowspan=3, padx=30)

        cols = ("Roll", "DOB", "Link")
        self.dip_tree = ttk.Treeview(self.diploma_tab, columns=cols, show="headings")
        for c in cols: self.dip_tree.heading(c, text=c); self.dip_tree.column(c, width=200, anchor="center")
        self.dip_tree.pack(fill="both", expand=True, padx=20, pady=20)
        self.dip_tree.bind("<<TreeviewSelect>>", self.on_dip_select)

    def save_fee(self):
        rolls = [self.fee_entries[k].get().strip() for k in ["roll_no", "name", "course", "total_fee", "remaining_fee"]]
        if not all(rolls): messagebox.showwarning("Error", "All fields required"); return
        self.manager.add_fee(*rolls)
        self.load_fee_table()
        messagebox.showinfo("Success", "Fee data updated!")

    def save_diploma(self):
        vals = [self.dip_entries[k].get().strip() for k in ["roll_no", "date_of_birth", "certificate_link_(url)"]]
        if not all(vals): messagebox.showwarning("Error", "All fields required"); return
        self.manager.add_diploma(*vals)
        self.load_diploma_table()
        messagebox.showinfo("Success", "Diploma record updated!")

    def load_fee_table(self):
        for i in self.fee_tree.get_children(): self.fee_tree.delete(i)
        for r, info in self.manager.fee_data.items():
            self.fee_tree.insert("", "end", values=(r, info["name"], info["course"], info["total"], info["remaining"], info.get("date","")))

    def load_diploma_table(self):
        for i in self.dip_tree.get_children(): self.dip_tree.delete(i)
        for c in self.manager.diploma_data["certificates"]:
            self.dip_tree.insert("", "end", values=(c["roll"], c["dob"], c["link"]))

    def on_fee_select(self, e):
        sel = self.fee_tree.focus()
        if not sel: return
        v = self.fee_tree.item(sel)["values"]
        for i, k in enumerate(["roll_no", "name", "course", "total_fee", "remaining_fee"]):
            self.fee_entries[k].delete(0, tk.END); self.fee_entries[k].insert(0, v[i])

    def on_dip_select(self, e):
        sel = self.dip_tree.focus()
        if not sel: return
        v = self.dip_tree.item(sel)["values"]
        for i, k in enumerate(["roll_no", "date_of_birth", "certificate_link_(url)"]):
            self.dip_entries[k].delete(0, tk.END); self.dip_entries[k].insert(0, v[i])

    def show_fee_graph(self):
        data = self.manager.fee_data
        names = [i["name"] for i in data.values()]
        remaining = [i["remaining"] for i in data.values()]
        plt.bar(names, remaining, color="coral")
        plt.title("Student Remaining Fees"); plt.xticks(rotation=45); plt.tight_layout(); plt.show()

if __name__ == "__main__":
    root = tk.Tk()
    BytecoreManagerApp(root)
    root.mainloop()
