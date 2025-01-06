// Function to toggle the theme
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);

    const themeToggle = document.querySelector('.theme-toggle i');
    themeToggle.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}

// Fetch and render data from YAML
async function loadData() {
    const response = await fetch('data/data.yaml');
    const yamlText = await response.text();
    const data = jsyaml.load(yamlText);

    document.getElementById('name').textContent = data.name;
    document.getElementById('bio').textContent = data.bio;

    // Social links
    const socialLinksContainer = document.getElementById('social-links');
    data.socialLinks.forEach(link => {
        const anchor = document.createElement('a');
        anchor.href = link.url;
        anchor.className = 'social-link';
        anchor.title = link.platform;
        anchor.innerHTML = `<i class="${link.icon}"></i>`;
        socialLinksContainer.appendChild(anchor);
    });

    // Experience
    const experienceTimeline = document.getElementById('experience-timeline');
    data.experience.forEach(exp => {
        experienceTimeline.innerHTML += `
            <div class="timeline-item">
                <div class="timeline-year">${exp.year}</div>
                <div class="timeline-bullet"></div>
                <div class="experience-content">
                    <img src="${exp.logo}" alt="${exp.company}" class="company-logo">
                    <div class="content">
                        <span class="title">${exp.title}</span>
                        <p class="description">${exp.description.replace(/\n/g, '<br>')}</p>
                    </div>
                </div>
            </div>`;
    });

    // Education
    const educationGrid = document.getElementById('education-grid');
    data.education.forEach(edu => {
        educationGrid.innerHTML += `
            <div class="education-item">
                <img src="${edu.logo}" alt="${edu.institution}" class="university-logo">
                <div class="content">
                    <span class="title">${edu.degree}</span>
                    <p class="description">${edu.description}</p>
                </div>
            </div>`;
    });

    // Writing, Projects, Misc
    document.getElementById('writing-content').innerHTML = data.writing.map(w =>
        `<div class="writing-item">
            <span class="year">${w.year}</span>
            <a href="${w.link}" class="title">${w.title}</a>
            <p class="description">${w.description}</p>
        </div>`).join('');

    document.getElementById('projects-grid').innerHTML = data.projects.map(p =>
        `<div class="project-card">
            <img src="${p.thumbnail}" alt="${p.title}" class="project-thumbnail">
            <h3>${p.title}</h3>
            <p>${p.description}</p>
            <a href="${p.link}" class="project-link">Learn More →</a>
        </div>`).join('');

    document.getElementById('misc-content').innerHTML = data.misc.map(m =>
        `<p>${m}</p>`).join('');
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    document.querySelector('.theme-toggle').addEventListener('click', toggleTheme);
});
