"use strict";

const projects = {
    1: {
        title: "Travel Booking Platform",
        category: "Full-Stack",
        description: "A complete web application built with MVC architecture that lets users search, filter, and book travel experiences with secure authentication and payment processing.",
        features: [
            "Stripe payment gateway integration",
            "Secure authentication with JWT and HTTP-only cookies",
            "Admin dashboard for managing bookings and itineraries",
            "PostgreSQL query optimization"
        ],
        tech: ["React", "Node.js", "Express", "PostgreSQL", "Tailwind CSS", "Stripe API"]
    },
    2: {
        title: "Interactive Pokédex UI",
        category: "Frontend",
        description: "A smooth, interactive interface powered by the REST PokeAPI, featuring optimized rendering, global state with Context API, and responsive design.",
        features: [
            "Real-time filtering by Pokémon type and abilities",
            "Visual base-stat charts for each character",
            "Full keyboard navigation support",
            "Custom light and dark modes"
        ],
        tech: ["TypeScript", "React", "PokeAPI", "Tailwind CSS"]
    },
    3: {
        title: "E-Commerce RESTful API",
        category: "Backend",
        description: "A robust API built on clean architecture principles to power high-traffic online stores.",
        features: [
            "Role-based access control (RBAC)",
            "Centralized error handling and DTO validation",
            "Unit and integration tests with Jest (over 85% coverage)",
            "Rate limiting and security with Helmet"
        ],
        tech: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Jest"]
    },
    4: {
        title: "Collaborative Kanban Board",
        category: "Full-Stack",
        description: "A Trello-style productivity tool for software teams that synchronizes boards instantly across multiple users.",
        features: [
            "WebSockets for live synchronization",
            "Smooth drag and drop for columns and cards",
            "Automated email notifications with Laravel Queues"
        ],
        tech: ["Laravel", "Vue.js", "MySQL", "Pusher", "Tailwind CSS"]
    }
};

const mobileMenuButton = document.getElementById("mobile-menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const projectModal = document.getElementById("project-modal");
const contactForm = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-btn");
const contactAlert = document.getElementById("contact-alert");
let lastFocusedElement;

document.getElementById("current-year").textContent = new Date().getFullYear();

mobileMenuButton.addEventListener("click", () => {
    const isExpanded = mobileMenuButton.getAttribute("aria-expanded") === "true";
    mobileMenuButton.setAttribute("aria-expanded", String(!isExpanded));
    mobileMenu.classList.toggle("hidden", isExpanded);
});

mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuButton.setAttribute("aria-expanded", "false");
    });
});

document.querySelectorAll(".filter-btn").forEach((button) => {
    button.addEventListener("click", () => {
        const category = button.dataset.filter;

        document.querySelectorAll(".filter-btn").forEach((filterButton) => {
            const isActive = filterButton === button;
            filterButton.classList.toggle("active", isActive);
            filterButton.classList.toggle("bg-indigo-600", isActive);
            filterButton.classList.toggle("text-white", isActive);
            filterButton.classList.toggle("bg-slate-800", !isActive);
            filterButton.classList.toggle("text-slate-300", !isActive);
            filterButton.setAttribute("aria-pressed", String(isActive));
        });

        document.querySelectorAll(".project-card").forEach((card) => {
            const shouldShow = category === "all" || card.dataset.category === category;
            card.style.display = shouldShow ? "flex" : "none";
        });
    });
});

function openProjectModal(projectId, trigger) {
    const project = projects[projectId];
    if (!project) {
        return;
    }

    lastFocusedElement = trigger;
    document.getElementById("modal-title").textContent = project.title;
    document.getElementById("modal-category").textContent = project.category;
    document.getElementById("modal-description").textContent = project.description;

    const featuresList = document.getElementById("modal-features");
    featuresList.replaceChildren(...project.features.map((feature) => {
        const item = document.createElement("li");
        item.textContent = feature;
        return item;
    }));

    const techList = document.getElementById("modal-tech");
    techList.replaceChildren(...project.tech.map((technology) => {
        const item = document.createElement("span");
        item.className = "px-2.5 py-1 rounded-md bg-slate-800 text-slate-300 text-xs font-medium border border-slate-700";
        item.textContent = technology;
        return item;
    }));

    projectModal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    projectModal.querySelector("[data-close-modal]").focus();
}

function closeProjectModal() {
    projectModal.classList.add("hidden");
    document.body.style.overflow = "";
    lastFocusedElement?.focus();
}

document.querySelectorAll("[data-project-id]").forEach((button) => {
    button.addEventListener("click", () => {
        openProjectModal(button.dataset.projectId, button);
    });
});

document.querySelectorAll("[data-close-modal]").forEach((button) => {
    button.addEventListener("click", closeProjectModal);
});

projectModal.addEventListener("click", (event) => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !projectModal.classList.contains("hidden")) {
        closeProjectModal();
    }
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    submitButton.disabled = true;
    submitButton.innerHTML = '<i class="fa-solid fa-spinner animate-spin"></i> Sending...';

    window.setTimeout(() => {
        submitButton.disabled = false;
        submitButton.innerHTML = '<span>Send Message</span> <i class="fa-solid fa-paper-plane text-sm"></i>';
        contactAlert.classList.remove("hidden");
        contactForm.reset();

        window.setTimeout(() => {
            contactAlert.classList.add("hidden");
        }, 5000);
    }, 1200);
});
