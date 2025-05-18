
const competencesContainer = document.querySelector("#competences-container")

const competences = [
    {
        name: "HTML",
        level: 90
    },
    {
        name: "CSS",
        level: 80
    },
    {
        name: "JavaScript",
        level: 60
    },
    {
        name: "SQL",
        level: 60
    },
    {
        name: "Node.js",
        level: 40
    },
    
    {
        name: "Java",
        level: 70
    },
    {
        name: "Python",
        level: 70
    },
    {
        name: "Lua",
        level: 50
    }
    
]


let hasAnimated = false;

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
            animateCompetences();
            hasAnimated = true;
            observer.unobserve(entry.target); // Arrête l’observation
        }
    });
}, { threshold: 0.5 }); // 0.5 = moitié visible

const competencesSection = document.getElementById("competences");
observer.observe(competencesSection);

function animateCompetences() {
    for (let i = 0; i < competences.length; i++) {
        const competence = competences[i];
        const competenceDiv = document.createElement("div");
        competenceDiv.classList.add("competence");

        const span = document.createElement("span");
        span.textContent = competence.name;

        const progressBar = document.createElement("div");
        progressBar.classList.add("progress-bar");

        const progress = document.createElement("div");
        progress.classList.add("progress");
        progress.style.width = "0%";

        progressBar.appendChild(progress);
        competenceDiv.appendChild(span);
        competenceDiv.appendChild(progressBar);
        competencesContainer.appendChild(competenceDiv);

        let current = 0;
        const target = competence.level;
        const speed = 10;

        const interval = setInterval(() => {
            if (current >= target) {
                clearInterval(interval);
            } else {
                current++;
                progress.style.width = current + "%";
            }
        }, speed);
    }
}


const qualitesContainer = document.querySelector("#qualites-container")

const qualites = ["Autonome", "Curieux", "Polyvalent", "Ponctuel", "Créatif", "Passionné", "Rigoureux"]

for(let i = 0; i < qualites.length; i++) {
    const qualite = qualites[i];
    const qualiteDiv = document.createElement("div");
    qualiteDiv.classList.add("qualite");
    qualiteDiv.innerHTML = `
        <span>${qualite}</span>
    `;
    qualitesContainer.appendChild(qualiteDiv);
}

document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = Object.fromEntries(formData.entries());

  const res = await fetch("/send-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  const result = await res.json();
  alert(result.message);
});
