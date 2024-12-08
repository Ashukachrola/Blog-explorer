// Dynamic Content Management
const pages = {
    home: `
      <section>
        <h2>Welcome to Blog Explorer</h2>
        <p>Explore amazing blogs on tech, lifestyle, and education. Use the search functionality to find what interests you!</p>
      </section>
    `,
    about: `
      <section>
        <h2>About Us</h2>
        <p>Blog Explorer is a platform where you can find and read insightful blogs on a variety of topics. We aim to deliver high-quality content for readers worldwide.</p>
      </section>
    `,
    blogs: `
      <section>
        <h2>Search Blogs</h2>
        <div class="search-container">
          <input type="text" id="searchBox" placeholder="Search blogs..." oninput="searchBlogs()" />
          <select id="filter" onchange="searchBlogs()">
            <option value="">All Categories</option>
            <option value="Tech">Tech</option>
            <option value="Lifestyle">Lifestyle</option>
            <option value="Education">Education</option>
          </select>
        </div>
        <div id="results" class="results"></div>
        <div id="pagination" class="pagination"></div>
      </section>
    `,
    contact: `
      <section>
        <h2>Contact Us</h2>
        <form id="contactForm">
          <div>
            <label for="name">Name</label>
            <input type="text" id="name" required />
          </div>
          <div>
            <label for="email">Email</label>
            <input type="email" id="email" required />
          </div>
          <div>
            <label for="message">Message</label>
            <textarea id="message" required></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </section>
    `,
  };
  
  // Load initial page
  document.getElementById("content").innerHTML = pages.home;
  
  // Navigation functionality
  function navigateTo(page) {
    document.getElementById("content").innerHTML = pages[page];
  
    // Highlight active link
    document.querySelectorAll(".nav-link").forEach((link) => link.classList.remove("active"));
    document.querySelector(`[onclick="navigateTo('${page}')"]`).classList.add("active");
  
    // Reinitialize search functionality
    if (page === "blogs") searchBlogs();
  }
  
  // Search Blogs Functionality
  const blogs = [
    { title: "Understanding JavaScript", category: "Tech", content: "JavaScript is a versatile language used for web development." },
    { title: "Healthy Living Tips", category: "Lifestyle", content: "Learn tips for a healthier and happier life." },
    { title: "Introduction to Machine Learning", category: "Tech", content: "Machine learning is revolutionizing the tech world." },
    { title: "Effective Study Techniques", category: "Education", content: "Study smart, not hard with these proven techniques." },
    { title: "Exploring CSS Grid", category: "Tech", content: "CSS Grid makes layout design simple and flexible." },
  ];
  
  function searchBlogs() {
    const query = document.getElementById('searchBox').value.toLowerCase();
    const filter = document.getElementById('filter').value;
    const resultsDiv = document.getElementById('results');
  
    const filteredBlogs = blogs.filter(blog => {
      const matchesQuery = blog.title.toLowerCase().includes(query) || blog.content.toLowerCase().includes(query);
      const matchesFilter = !filter || blog.category === filter;
      return matchesQuery && matchesFilter;
    });
  
    resultsDiv.innerHTML = filteredBlogs.map(blog => `
      <div class="card">
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
      </div>
    `).join('');
  
    if (!filteredBlogs.length) {
      resultsDiv.innerHTML = `<p>No results found.</p>`;
    }
  }
  