Custom Toast Notification Library
A lightweight, customizable JavaScript library for creating toast notifications and loading indicators. Supports multiple toast types (info, success, warning, error), dynamic creation, queue management, and responsive design.

Features

Multiple Toast Types: Info, Success, Warning, Error, with loader variants.
Dynamic Creation: Toasts are created on-the-fly, no static HTML required.
Queue Management: Displays toasts sequentially to avoid overlap.
Customizable: Supports custom titles, messages, durations, and callbacks.
Loading Indicators: Easily add loading states to buttons or elements.
Responsive: Adapts to different screen sizes with mobile-friendly design.
Lightweight: Minimal CSS and JS with no external dependencies (except Font Awesome for icons).

Installation

Clone the repository:
git clone https://github.com/<your-username>/<your-repo-name>.git


Include files in your project:Copy src/toast.css and src/toast.js to your project. Link them in your HTML:
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css">
<link rel="stylesheet" href="path/to/toast.css">
<script src="path/to/toast.js"></script>


Add toast container:Include an empty toast container in your HTML with a position attribute:
<div class="toast-container" toast-position="top-right"></div>



Usage
Showing a Toast
Use Toast.show to display a toast notification:
// Basic usage
Toast.show("success", "Data saved successfully!", 4000);

// With custom title and callback
Toast.show("error", "System Error", "Please try again!", 5000, () => {
    console.log("Toast closed");
});

Supported types: info, success, warning, error, info-loader, success-loader, warning-loader, error-loader.
Managing Loading State
Add loading indicators to buttons or elements:
const btn = document.querySelector("button");
Toast.setLoading(btn);
setTimeout(() => Toast.clearLoading(btn), 2000);

Hiding All Toasts
Clear all active toasts:
Toast.hideAll();

Example
See examples/index.html for a complete demo:
<button class="loading" onclick="Toast.show('success', 'Thành công', 'Dữ liệu đã được lưu!', 4000)">Show Success</button>
<button class="loading" onclick="testLoading(this)">Test Loading</button>
<script>
    function testLoading(btn) {
        Toast.setLoading(btn);
        setTimeout(() => Toast.clearLoading(btn), 2000);
    }
</script>

Configuration
Customize default titles and icons in toast.js:
const config = {
    defaultDuration: 4000,
    icons: {
        info: "fa-info-circle",
        success: "fa-check-circle",
        // ...
    },
    titles: {
        info: "Thông tin!",
        success: "Thành công!",
        // ...
    },
    lang: "vi" // Change to "en" for English
};

Supported Positions
Set the toast-position attribute on .toast-container:

top-right, top-left, top-center
bottom-right, bottom-left, bottom-center

Dependencies

Font Awesome (for icons)

Browser Support

Chrome, Firefox, Safari, Edge
Responsive on mobile devices

Contributing
Contributions are welcome! Please follow these steps:

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Commit your changes (git commit -m "Add your feature").
Push to the branch (git push origin feature/your-feature).
Open a Pull Request.

License
MIT License
Acknowledgments
Inspired by popular toast libraries like Toastify and toastr.

Created by 
