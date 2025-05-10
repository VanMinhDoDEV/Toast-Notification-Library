/**
 * Toast and Loading Library
 * @module Toast
 */
document.addEventListener("DOMContentLoaded", function () {
    const toastContainer = document.querySelector(".toast-container");
    const toastQueue = [];
    let isDisplaying = false;

    // Default configurations
    const config = {
        defaultDuration: 4000,
        icons: {
            info: "fa-info-circle",
            success: "fa-check-circle",
            warning: "fa-exclamation-circle",
            error: "fa-times-circle",
            "info-loader": "fa-info-circle",
            "success-loader": "fa-check-circle",
            "warning-loader": "fa-exclamation-circle",
            "error-loader": "fa-times-circle"
        },
        titles: {
            info: "Thông tin!",
            success: "Thành công!",
            warning: "Cảnh báo!",
            error: "Lỗi!",
            "info-loader": "Đang xử lý...",
            "success-loader": "Đang xử lý...",
            "warning-loader": "Đang xử lý...",
            "error-loader": "Đang xử lý..."
        },
        lang: "vi" // Default language
    };

    /**
     * Creates a toast element dynamically
     * @param {string} type - Toast type: info, success, warning, error, or *-loader
     * @param {string} title - Toast title
     * @param {string} message - Toast message
     * @returns {HTMLElement} - Created toast element
     */
    function createToast(type, title, message) {
        const toast = document.createElement("div");
        toast.classList.add("toast");
        toast.setAttribute("data-type", type);
        toast.innerHTML = `
            <i class="fas ${config.icons[type]}"></i>
            <div class="headlines">
                <h3 data-state="${type.replace("-loader", "")}">${title}</h3>
                <p>${message}</p>
            </div>
            <button class="btn-close"><i class="fa-regular fa-x"></i></button>
        `;
        toastContainer.appendChild(toast);

        // Attach close event
        toast.querySelector(".btn-close").addEventListener("click", () => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
                displayNextToast();
            }, 500);
        });

        return toast;
    }

    /**
     * Displays the next toast in the queue
     */
    function displayNextToast() {
        if (!toastQueue.length || isDisplaying) return;
        isDisplaying = true;

        const { type, title, message, duration, callback } = toastQueue[0];
        const toast = createToast(type, title, message);

        // Show toast
        setTimeout(() => toast.classList.add("show"), 10);

        // Hide toast after duration
        setTimeout(() => {
            toast.classList.remove("show");
            setTimeout(() => {
                toast.remove();
                toastQueue.shift();
                isDisplaying = false;
                displayNextToast();
                if (callback) callback();
            }, 500);
        }, duration);
    }

    /**
     * Shows a toast notification
     * @param {string} type - Toast type: info, success, warning, error, or *-loader
     * @param {string} [title] - Custom title (optional)
     * @param {string} message - Toast message
     * @param {number} [duration=4000] - Display duration in ms
     * @param {function} [callback] - Callback when toast hides
     * @example
     * Toast.show("success", "Thành công", "Dữ liệu đã được lưu!", 5000, () => console.log("Toast closed"));
     */
    function showToast(type, title, message, duration = config.defaultDuration, callback) {
        if (!config.icons[type]) {
            console.error(`Invalid toast type: ${type}`);
            return;
        }
        if (arguments.length === 2 && typeof title === "string") {
            message = title;
            title = config.titles[type];
        } else {
            title = title || config.titles[type];
        }
        toastQueue.push({ type, title, message, duration, callback });
        displayNextToast();
    }

    /**
     * Hides all toasts
     */
    function hideAllToasts() {
        toastQueue.length = 0;
        toastContainer.querySelectorAll(".toast").forEach(toast => {
            toast.classList.remove("show");
            setTimeout(() => toast.remove(), 500);
        });
        isDisplaying = false;
    }

    /**
     * Shows loading state on an element
     * @param {HTMLElement} element - Element to show loading
     */
    function setLoading(element) {
        if (!element.classList.contains("loading")) {
            element.classList.add("loading");
            const loader = document.createElement("span");
            loader.classList.add("loader");
            element.appendChild(loader);
        }
        if (element.tagName === "BUTTON" || element.tagName === "INPUT") {
            element.disabled = true;
        }
    }

    /**
     * Clears loading state on an element
     * @param {HTMLElement} element - Element to clear loading
     */
    function clearLoading(element) {
        element.classList.remove("loading");
        const loader = element.querySelector(".loader");
        if (loader) loader.remove();
        if (element.tagName === "BUTTON" || element.tagName === "INPUT") {
            element.disabled = false;
        }
    }

    // Expose public API
    window.Toast = {
        show: showToast,
        hideAll: hideAllToasts,
        setLoading,
        clearLoading
    };
});