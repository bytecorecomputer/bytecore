import json
import os
from tkinter import *
from tkinter import messagebox, filedialog

CERTIFICATES_FILE = "certificates.json"

class CertificateManager:
    def __init__(self, filename=CERTIFICATES_FILE):
        self.filename = filename
        self.certificates = []
        self.load_data()

    def load_data(self):
        """Load data from JSON file"""
        try:
            if os.path.exists(self.filename):
                with open(self.filename, 'r') as file:
                    data = json.load(file)
                    self.certificates = data.get('certificates', [])
            else:
                self.certificates = []
                self.save_data()
        except Exception as e:
            messagebox.showerror("Error", f"Failed to load data: {str(e)}")
            self.certificates = []

    def save_data(self):
        """Save data to JSON file"""
        try:
            with open(self.filename, 'w') as file:
                json.dump({"certificates": self.certificates}, file, indent=4)
            return True
        except Exception as e:
            messagebox.showerror("Error", f"Failed to save data: {str(e)}")
            return False

    def add_certificate(self, roll, link):
        """Add a new certificate"""
        if not roll or not link:
            return False, "Roll number and link are required"
        
        if any(cert['roll'] == roll for cert in self.certificates):
            return False, f"Roll number {roll} already exists"
        
        self.certificates.append({"roll": roll, "link": link})
        if self.save_data():
            return True, f"Certificate for roll {roll} added successfully"
        else:
            self.certificates.pop()  # Remove the added certificate if save fails
            return False, "Failed to save data"

    def update_certificate(self, roll, new_link=None, new_roll=None):
        """Update an existing certificate"""
        for cert in self.certificates:
            if cert['roll'] == roll:
                if new_link:
                    cert['link'] = new_link
                if new_roll:
                    # Check if new roll already exists
                    if any(c['roll'] == new_roll for c in self.certificates if c['roll'] != roll):
                        return False, f"Roll number {new_roll} already exists"
                    cert['roll'] = new_roll
                if self.save_data():
                    return True, f"Certificate for roll {roll} updated successfully"
                else:
                    return False, "Failed to save data"
        return False, f"Roll number {roll} not found"

    def delete_certificate(self, roll):
        """Delete a certificate"""
        initial_length = len(self.certificates)
        self.certificates = [cert for cert in self.certificates if cert['roll'] != roll]
        
        if len(self.certificates) < initial_length:
            if self.save_data():
                return True, f"Certificate for roll {roll} deleted successfully"
            else:
                # Restore the data if save fails
                self.load_data()
                return False, "Failed to save data after deletion"
        return False, f"Roll number {roll} not found"

    def search_certificate(self, roll):
        """Search for a certificate by roll number"""
        for cert in self.certificates:
            if cert['roll'] == roll:
                return True, cert
        return False, f"Roll number {roll} not found"

    def get_all_certificates(self):
        """Get all certificates"""
        return self.certificates

class CertificateManagerGUI:
    def __init__(self, root):
        self.root = root
        self.manager = CertificateManager()
        self.setup_ui()

    def setup_ui(self):
        self.root.title("Certificate Manager")
        self.root.geometry("800x600")

        # Main Frame
        main_frame = Frame(self.root, padx=20, pady=20)
        main_frame.pack(fill=BOTH, expand=True)

        # Title
        Label(main_frame, text="Certificate Management System", font=("Arial", 16, "bold")).grid(row=0, column=0, columnspan=3, pady=10)

        # Input Fields
        Label(main_frame, text="Roll Number:").grid(row=1, column=0, sticky=W, pady=5)
        self.roll_entry = Entry(main_frame, width=30)
        self.roll_entry.grid(row=1, column=1, pady=5)

        Label(main_frame, text="Certificate Link:").grid(row=2, column=0, sticky=W, pady=5)
        self.link_entry = Entry(main_frame, width=50)
        self.link_entry.grid(row=2, column=1, pady=5)

        # Buttons
        Button(main_frame, text="Add", command=self.add_certificate).grid(row=3, column=0, pady=10)
        Button(main_frame, text="Update", command=self.update_certificate).grid(row=3, column=1, pady=10)
        Button(main_frame, text="Delete", command=self.delete_certificate).grid(row=3, column=2, pady=10)
        Button(main_frame, text="Search", command=self.search_certificate).grid(row=4, column=0, pady=10)
        Button(main_frame, text="Show All", command=self.show_all_certificates).grid(row=4, column=1, pady=10)
        Button(main_frame, text="Clear", command=self.clear_fields).grid(row=4, column=2, pady=10)

        # Results Text Area
        self.result_text = Text(main_frame, height=15, width=80, wrap=WORD)
        self.result_text.grid(row=5, column=0, columnspan=3, pady=10)

        # Scrollbar
        scrollbar = Scrollbar(main_frame, command=self.result_text.yview)
        scrollbar.grid(row=5, column=3, sticky='ns')
        self.result_text.config(yscrollcommand=scrollbar.set)

    def add_certificate(self):
        roll = self.roll_entry.get().strip()
        link = self.link_entry.get().strip()
        
        if not roll or not link:
            messagebox.showwarning("Warning", "Both roll number and link are required")
            return
        
        success, message = self.manager.add_certificate(roll, link)
        if success:
            messagebox.showinfo("Success", message)
            self.clear_fields()
        else:
            messagebox.showerror("Error", message)

    def update_certificate(self):
        roll = self.roll_entry.get().strip()
        new_link = self.link_entry.get().strip()
        
        if not roll:
            messagebox.showwarning("Warning", "Roll number is required for update")
            return
        
        if not new_link:
            messagebox.showwarning("Warning", "Please provide a new link for update")
            return
        
        success, message = self.manager.update_certificate(roll, new_link)
        if success:
            messagebox.showinfo("Success", message)
            self.clear_fields()
        else:
            messagebox.showerror("Error", message)

    def delete_certificate(self):
        roll = self.roll_entry.get().strip()
        
        if not roll:
            messagebox.showwarning("Warning", "Roll number is required for deletion")
            return
        
        confirm = messagebox.askyesno("Confirm", f"Are you sure you want to delete certificate for roll {roll}?")
        if confirm:
            success, message = self.manager.delete_certificate(roll)
            if success:
                messagebox.showinfo("Success", message)
                self.clear_fields()
            else:
                messagebox.showerror("Error", message)

    def search_certificate(self):
        roll = self.roll_entry.get().strip()
        
        if not roll:
            messagebox.showwarning("Warning", "Roll number is required for search")
            return
        
        success, result = self.manager.search_certificate(roll)
        if success:
            self.result_text.delete(1.0, END)
            self.result_text.insert(END, f"Roll: {result['roll']}\n")
            self.result_text.insert(END, f"Link: {result['link']}\n")
        else:
            messagebox.showinfo("Not Found", result)

    def show_all_certificates(self):
        certificates = self.manager.get_all_certificates()
        self.result_text.delete(1.0, END)
        
        if not certificates:
            self.result_text.insert(END, "No certificates found in the database")
            return
        
        for cert in certificates:
            self.result_text.insert(END, f"Roll: {cert['roll']}\n")
            self.result_text.insert(END, f"Link: {cert['link']}\n")
            self.result_text.insert(END, "-"*50 + "\n")

    def clear_fields(self):
        self.roll_entry.delete(0, END)
        self.link_entry.delete(0, END)
        self.result_text.delete(1.0, END)

def main():
    # Uncomment to use CLI version
    # cli_version()
    
    # GUI version
    root = Tk()
    app = CertificateManagerGUI(root)
    root.mainloop()

def cli_version():
    manager = CertificateManager()
    print("Certificate Management System")
    
    while True:
        print("\nOptions:")
        print("1. Add Certificate")
        print("2. Update Certificate")
        print("3. Delete Certificate")
        print("4. Search Certificate")
        print("5. Show All Certificates")
        print("6. Exit")
        
        choice = input("Enter your choice (1-6): ")
        
        if choice == '1':
            roll = input("Enter roll number: ").strip()
            link = input("Enter certificate link: ").strip()
            success, message = manager.add_certificate(roll, link)
            print(message)
        
        elif choice == '2':
            roll = input("Enter roll number to update: ").strip()
            new_link = input("Enter new link (leave blank to keep current): ").strip()
            new_roll = input("Enter new roll number (leave blank to keep current): ").strip()
            
            if not new_link and not new_roll:
                print("No changes provided")
                continue
                
            success, message = manager.update_certificate(roll, new_link or None, new_roll or None)
            print(message)
        
        elif choice == '3':
            roll = input("Enter roll number to delete: ").strip()
            success, message = manager.delete_certificate(roll)
            print(message)
        
        elif choice == '4':
            roll = input("Enter roll number to search: ").strip()
            success, result = manager.search_certificate(roll)
            if success:
                print("\nCertificate Found:")
                print(f"Roll: {result['roll']}")
                print(f"Link: {result['link']}")
            else:
                print(result)
        
        elif choice == '5':
            certificates = manager.get_all_certificates()
            if not certificates:
                print("No certificates in database")
            else:
                print("\nAll Certificates:")
                for cert in certificates:
                    print(f"\nRoll: {cert['roll']}")
                    print(f"Link: {cert['link']}")
                    print("-"*50)
        
        elif choice == '6':
            print("Exiting...")
            break
        
        else:
            print("Invalid choice. Please try again.")

if __name__ == "__main__":
    main()