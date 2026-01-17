// Ebook Data
const ebooks = [
    {
        id: 1,
        title: "The Art of Creative Thinking",
        author: "John Adair",
        category: "selfhelp",
        description: "A guide to developing your creative potential in business and in life. This book provides practical techniques and exercises to help you think more creatively and solve problems more effectively.",
        pages: 215,
        rating: 4.5,
        downloads: 12450,
        format: "PDF, EPUB, MOBI",
        size: "2.4 MB",
        coverColor: "#4361ee",
        year: 2020
    },
    {
        id: 2,
        title: "Silent Echoes",
        author: "Elena Rodriguez",
        category: "fiction",
        description: "A gripping mystery novel about a journalist who returns to her hometown to uncover the truth behind her sister's disappearance, only to find herself entangled in a web of secrets.",
        pages: 342,
        rating: 4.7,
        downloads: 18920,
        format: "PDF, EPUB",
        size: "3.1 MB",
        coverColor: "#7209b7",
        year: 2021
    },
    {
        id: 3,
        title: "Introduction to Machine Learning",
        author: "Dr. Michael Chen",
        category: "technology",
        description: "A comprehensive introduction to machine learning concepts, algorithms, and applications. Perfect for beginners and those looking to expand their knowledge in AI.",
        pages: 418,
        rating: 4.8,
        downloads: 25630,
        format: "PDF",
        size: "5.2 MB",
        coverColor: "#4cc9f0",
        year: 2022
    },
    {
        id: 4,
        title: "The History of Ancient Civilizations",
        author: "Prof. Richard Evans",
        category: "nonfiction",
        description: "Explore the rise and fall of ancient civilizations from Mesopotamia to Rome. This book offers fresh insights based on the latest archaeological discoveries.",
        pages: 512,
        rating: 4.6,
        downloads: 15480,
        format: "PDF, EPUB",
        size: "4.7 MB",
        coverColor: "#f72585",
        year: 2019
    },
    {
        id: 5,
        title: "Business Strategy in the Digital Age",
        author: "Sarah Johnson & Mark Williams",
        category: "business",
        description: "Learn how to adapt traditional business strategies for the digital era. Case studies from successful companies that have thrived in the changing landscape.",
        pages: 295,
        rating: 4.4,
        downloads: 11200,
        format: "PDF, EPUB, MOBI",
        size: "2.9 MB",
        coverColor: "#3a56d4",
        year: 2021
    },
    {
        id: 6,
        title: "Fundamentals of Psychology",
        author: "Dr. Lisa Carter",
        category: "academic",
        description: "An accessible textbook covering the core concepts of psychology, perfect for students and anyone interested in understanding human behavior.",
        pages: 387,
        rating: 4.7,
        downloads: 20340,
        format: "PDF",
        size: "4.1 MB",
        coverColor: "#7209b7",
        year: 2020
    },
    {
        id: 7,
        title: "Ocean's Whisper",
        author: "Maya Thompson",
        category: "fiction",
        description: "A beautiful literary fiction about a marine biologist who discovers a mysterious underwater phenomenon that challenges everything we know about the ocean.",
        pages: 278,
        rating: 4.3,
        downloads: 8760,
        format: "PDF, EPUB, MOBI",
        size: "2.5 MB",
        coverColor: "#4cc9f0",
        year: 2022
    },
    {
        id: 8,
        title: "Mindfulness for Beginners",
        author: "David Park",
        category: "selfhelp",
        description: "A practical guide to incorporating mindfulness into your daily life. Simple exercises and techniques to reduce stress and increase focus.",
        pages: 192,
        rating: 4.5,
        downloads: 16780,
        format: "PDF, EPUB",
        size: "1.8 MB",
        coverColor: "#f72585",
        year: 2021
    }
];

// DOM Elements
const featuredEbooksContainer = document.getElementById('featuredEbooks');
const allEbooksContainer = document.getElementById('allEbooks');
const ebookModal = document.getElementById('ebookModal');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');
const searchInput = document.getElementById('searchInput');
const categoryCards = document.querySelectorAll('.category-card');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const nav = document.querySelector('nav');
const loadMoreBtn = document.getElementById('loadMore');
const newsletterForm = document.getElementById('newsletterForm');
const signInBtn = document.getElementById('signInBtn');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderFeaturedEbooks();
    renderAllEbooks();
    setupEventListeners();
});

// Render featured ebooks (first 4)
function renderFeaturedEbooks() {
    featuredEbooksContainer.innerHTML = '';
    const featured = ebooks.slice(0, 4);
    
    featured.forEach(ebook => {
        const ebookCard = createEbookCard(ebook);
        featuredEbooksContainer.appendChild(ebookCard);
    });
}

// Render all ebooks
function renderAllEbooks(filteredEbooks = null) {
    allEbooksContainer.innerHTML = '';
    const ebooksToRender = filteredEbooks || ebooks;
    
    ebooksToRender.forEach(ebook => {
        const ebookCard = createEbookCard(ebook);
        allEbooksContainer.appendChild(ebookCard);
    });
}

// Create ebook card element
function createEbookCard(ebook) {
    const card = document.createElement('div');
    card.className = 'ebook-card';
    card.dataset.id = ebook.id;
    card.dataset.category = ebook.category;
    
    // Generate star rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(ebook.rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(ebook.rating) && !Number.isInteger(ebook.rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    // Category display names
    const categoryNames = {
        fiction: "Fiction",
        nonfiction: "Non-Fiction",
        academic: "Academic",
        business: "Business",
        technology: "Technology",
        selfhelp: "Self-Help"
    };
    
    card.innerHTML = `
        <div class="ebook-cover" style="background-color: ${ebook.coverColor};">
            <div style="height: 100%; display: flex; align-items: center; justify-content: center; color: white; font-size: 2.5rem;">
                <i class="fas fa-book"></i>
            </div>
        </div>
        <div class="ebook-info">
            <h3 class="ebook-title">${ebook.title}</h3>
            <p class="ebook-author">by ${ebook.author}</p>
            <div class="ebook-meta">
                <span class="ebook-category">${categoryNames[ebook.category]}</span>
                <span class="rating">${stars} ${ebook.rating}</span>
            </div>
            <div class="ebook-actions">
                <span><i class="fas fa-download"></i> ${ebook.downloads.toLocaleString()}</span>
                <button class="btn btn-small btn-outline view-details">View Details</button>
            </div>
        </div>
    `;
    
    // Add event listener to view details button
    card.querySelector('.view-details').addEventListener('click', function(e) {
        e.stopPropagation();
        showEbookDetails(ebook.id);
    });
    
    // Also make the whole card clickable
    card.addEventListener('click', function() {
        showEbookDetails(ebook.id);
    });
    
    return card;
}

// Show ebook details in modal
function showEbookDetails(ebookId) {
    const ebook = ebooks.find(e => e.id === ebookId);
    if (!ebook) return;
    
    // Category display names
    const categoryNames = {
        fiction: "Fiction",
        nonfiction: "Non-Fiction",
        academic: "Academic",
        business: "Business",
        technology: "Technology",
        selfhelp: "Self-Help"
    };
    
    // Generate star rating
    let stars = '';
    for (let i = 1; i <= 5; i++) {
        if (i <= Math.floor(ebook.rating)) {
            stars += '<i class="fas fa-star"></i>';
        } else if (i === Math.ceil(ebook.rating) && !Number.isInteger(ebook.rating)) {
            stars += '<i class="fas fa-star-half-alt"></i>';
        } else {
            stars += '<i class="far fa-star"></i>';
        }
    }
    
    modalBody.innerHTML = `
        <div class="modal-ebook-details">
            <div class="modal-cover">
                <div style="background-color: ${ebook.coverColor}; height: 300px; border-radius: var(--border-radius); display: flex; align-items: center; justify-content: center; color: white; font-size: 4rem;">
                    <i class="fas fa-book"></i>
                </div>
            </div>
            <div class="modal-info">
                <h2>${ebook.title}</h2>
                <p class="ebook-author" style="font-size: 1.2rem; margin-bottom: 20px;">by ${ebook.author}</p>
                
                <div style="display: flex; gap: 10px; margin-bottom: 20px;">
                    <span class="ebook-category">${categoryNames[ebook.category]}</span>
                    <span class="rating">${stars} ${ebook.rating}</span>
                </div>
                
                <p>${ebook.description}</p>
                
                <div style="background-color: var(--light-gray); padding: 20px; border-radius: var(--border-radius); margin: 25px 0;">
                    <h4 style="margin-bottom: 15px;">Book Details</h4>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                        <div><strong>Pages:</strong> ${ebook.pages}</div>
                        <div><strong>File Size:</strong> ${ebook.size}</div>
                        <div><strong>Published:</strong> ${ebook.year}</div>
                        <div><strong>Downloads:</strong> ${ebook.downloads.toLocaleString()}</div>
                        <div><strong>Format:</strong> ${ebook.format}</div>
                        <div><strong>Category:</strong> ${categoryNames[ebook.category]}</div>
                    </div>
                </div>
                
                <button class="btn modal-download-btn"><i class="fas fa-download"></i> Download eBook for Free</button>
                <p style="text-align: center; margin-top: 10px; color: var(--gray); font-size: 0.9rem;">No registration required. Download immediately.</p>
            </div>
        </div>
    `;
    
    // Add event listener to download button
    modalBody.querySelector('.modal-download-btn').addEventListener('click', function() {
        alert(`Thank you for downloading "${ebook.title}"! Your download will begin shortly.`);
        ebookModal.style.display = 'none';
    });
    
    ebookModal.style.display = 'flex';
}

// Setup event listeners
function setupEventListeners() {
    // Modal close
    modalClose.addEventListener('click', function() {
        ebookModal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    ebookModal.addEventListener('click', function(e) {
        if (e.target === ebookModal) {
            ebookModal.style.display = 'none';
        }
    });
    
    // Search functionality
    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        if (searchTerm.length > 0) {
            const filteredEbooks = ebooks.filter(ebook => 
                ebook.title.toLowerCase().includes(searchTerm) || 
                ebook.author.toLowerCase().includes(searchTerm) ||
                ebook.category.toLowerCase().includes(searchTerm)
            );
            renderAllEbooks(filteredEbooks);
        } else {
            renderAllEbooks();
        }
    });
    
    // Category filter
    categoryCards.forEach(card => {
        card.addEventListener('click', function() {
            const category = this.dataset.category;
            const filteredEbooks = ebooks.filter(ebook => ebook.category === category);
            
            // Update active state
            categoryCards.forEach(c => c.classList.remove('active'));
            this.classList.add('active');
            
            renderAllEbooks(filteredEbooks);
            
            // Scroll to ebooks section
            document.getElementById('all-ebooks').scrollIntoView({ behavior: 'smooth' });
        });
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.innerHTML = nav.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function() {
            nav.classList.remove('active');
            mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
    
    // Load more ebooks
    loadMoreBtn.addEventListener('click', function(e) {
        e.preventDefault();
        this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
        
        // Simulate loading more ebooks
        setTimeout(() => {
            alert("In a real application, more eBooks would be loaded from the server. This is a demo.");
            this.innerHTML = 'Load More eBooks';
        }, 1000);
    });
    
    // Newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('newsletterEmail').value;
        alert(`Thank you for subscribing with ${email}! You'll receive our newsletter with new free eBooks.`);
        this.reset();
    });
    
    // Sign in button
    signInBtn.addEventListener('click', function(e) {
        e.preventDefault();
        alert("In a real application, this would open a sign-in/sign-up modal.");
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}