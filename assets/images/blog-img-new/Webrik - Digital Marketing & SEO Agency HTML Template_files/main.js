/*-----------------------------------------------------------------------------------

    Theme Name: Webrik - Digital Marketing & SEO Agency HTML Template
    Description: Digital Marketing & SEO Agency HTML Template
    Author: Website Design Templates
    Version: 1.0
        
    ---------------------------------- */

! function (e) {
    "use strict";
    var t = e(window);

    function o() {
        var o, a, l, r, i;
        o = e(".full-screen"), a = t.height(), o.css("min-height", a), l = e("header").height(), r = e(".screen-height"), i = t.height() - l, r.css("height", i)
    }
    e("#preloader").fadeOut("normall", function () {
        e(this).remove()
    }), t.on("scroll", function () {
        var o = t.scrollTop(),
            a = e(".navbar-brand img"),
            l = e(".navbar-brand.logodefault img");
        o <= 175 ? (e("header").removeClass("scrollHeader").addClass("fixedHeader"), a.attr("src", "img/logos/white.webp"), l.attr("src", "img/logos/sphere-innovative-logo.webp")) : (e("header").removeClass("fixedHeader").addClass("scrollHeader"), a.attr("src", "img/logos/sphere-innovative-logo.webp"), l.attr("src", "img/logos/white.webp"))
    }), (() => {
        let t = getComputedStyle(document.documentElement),
            o = t.getPropertyValue("--primary-color").trim(),
            a = t.getPropertyValue("--secondary-color").trim(),
            l = () => {
                let t = document.documentElement.scrollTop,
                    l = document.documentElement.scrollHeight - document.documentElement.clientHeight,
                    r = Math.round(t / l * 100),
                    i = e(".scroll-top-percentage");
                i.css("background", `conic-gradient(${o} ${r}%, ${a} ${r}%)`), t > 100 ? i.addClass("active") : i.removeClass("active"), r < 96 ? e("#scroll-value").text(`${r}%`) : e("#scroll-value").html('<i class="fa-solid fa-angle-up"></i>')
            };
        window.onscroll = l, window.onload = l, e(".scroll-top-percentage").on("click", function e() {
            document.documentElement.scrollTo({
                top: 0,
                behavior: "smooth"
            })
        })
    })(), e(".parallax,.bg-img").each(function (t) {
        e(this).attr("data-background") && e(this).css("background-image", "url(" + e(this).data("background") + ")")
    }), new WOW({
        boxClass: "wow",
        animateClass: "animated",
        offset: 0,
        mobile: !1,
        live: !0
    }).init(), e(".story-video").magnificPopup({
        delegate: ".video",
        type: "iframe"
    }), t.resize(function (e) {
        setTimeout(function () {
            o()
        }, 500), e.preventDefault()
    }), o(), e(document).ready(function () {
        e(".owl-carousel").each(function () {
            let t = e(this),
                o = t.attr("data-owl"),
                a = {};
            if (o) try {
                a = JSON.parse(o)
            } catch (l) {
                return
            }
            try {
                t.owlCarousel(a)
            } catch (r) { }
        });
        let t = document.querySelectorAll(".services-content .item"),
            o = document.querySelectorAll(".img-group .services-img");
        t.forEach((e, a) => {
            e.addEventListener("mouseenter", function () {
                var l, r;
                l = e, r = o[a], t.forEach(e => {
                    e.classList.remove("active"), e.classList.add("item")
                }), o.forEach(e => {
                    e.classList.remove("active"), e.classList.add("services-img")
                }), l.classList.add("active"), r.classList.add("active")
            })
        }), e(".countdown").countdown({
            date: "01 February 2028 00:01:00",
            format: "on"
        }), e(".current-year").text(new Date().getFullYear()), e(".odometer").waypoint(function (t) {
            if ("down" === t) {
                let o = e(this.element).attr("data-count");
                e(this.element).html(o)
            }
        }, {
            offset: "80%"
        })
    }), e(document).ready(function () {
        e(".wlt-btn, .wlt-overlay-bg").on("click", function () {
            e(".wlt-overlay-bg").hasClass("active") ? e(".wlt-overlay-bg").animate({
                opacity: "0"
            }, 500, function () {
                e(".wlt-overlay-bg").removeClass("active").hide()
            }) : e(".wlt-overlay-bg").addClass("active").show().animate({
                opacity: "1"
            }, 500, function () { }), e(".wlt-sidebar-main").toggleClass("active")
        }), e(".wlt-sidebar-inner").scrollbar()
    }), t.on("load", function () {
        e(".portfolio-gallery,.portfolio-gallery-isotope").lightGallery(), e(".portfolio-link").on("click", e => {
            e.stopPropagation()
        })
    })
}(jQuery);






// Object holding data for each service
const servicesData = {
    "it-infrustructure": {
        title: "IT Infrastructure",
        description: `Our IT Infrastructure services focus on building the backbone of your organization’s digital environment. We provide end-to-end solutions that include planning, designing, implementing, and maintaining secure, scalable, and high-performing IT systems. From networking and data centers to enterprise-grade servers and cloud integration, we ensure your business has a strong and reliable technology foundation.

<h2 class='service-sub-headings'>Our expertise covers:</h2>
<ul>
<li><strong>Network Design & Deployment</strong>: Secure LAN, WAN, and wireless networks tailored to your business needs.</li>
<li><strong>Data Center Solutions</strong>: High-availability storage, backup, and disaster recovery systems.</li>
<li><strong>Systems Integration</strong>: Seamless integration of hardware, software, and cloud services.</li>
<li><strong>Database Management</strong>: Efficient, secure, and scalable database solutions for optimized performance.</li>
<li><strong>IT Consultancy</strong>: Strategic assessments and consultative studies to align IT infrastructure with business goals.</li>
</ul>
By leveraging best-in-class technologies and industry best practices, we help businesses enhance operational efficiency, reduce downtime, and stay future-ready.`,
        mainImage: "img/portfolio/service detail/IT-Infrastructure.jpg",
        gallery: [
        ]
    },
    "Professional-&-management": {
        title: "Professional & Management Development Training Abroad",
        description: `Our Professional & Management Development Training Abroad programs are tailored to equip individuals and organizations with the knowledge, skills, and global exposure required to thrive in today’s competitive environment. We partner with internationally recognized training institutions to deliver specialized short-term courses that combine theoretical learning with practical insights.

<h2 class='service-sub-headings'>Key training areas include:</h2>
<ul>
<li><strong>Leadership & Management</strong>: Enhancing decision-making, problem-solving, and team-building skills</li>
<li><strong>Human Resource Development</strong>: Training in talent acquisition, employee engagement, and performance management.</li>
<li><strong>Finance & Accounting</strong>: Courses in banking, investment, taxation, and corporate finance.</li>
<li><strong>Sales & Marketing</strong>: Strategies in branding, digital marketing, and customer relationship management.</li>
<li><strong>Legal & Administrative Skills</strong>: Secretarial, compliance, and corporate governance training.</li>
<li><strong>Education & Social Development</strong>: Courses on behavioral sciences, community development, and teaching methodologies.</li>
</ul>
By providing opportunities to learn abroad, participants gain exposure to international business practices, innovative problem-solving techniques, and multicultural environments. These programs help professionals enhance their career growth, expand their networks, and bring fresh perspectives back to their organizations.`,

        mainImage: "img/portfolio/service detail/Professional-Management.jpg",
        gallery: [

        ]
    },
    "Project-management": {
        title: "Project Management",
        description: `Successful projects require structured execution and a clear roadmap. Our Project Management services are designed to guide your initiatives from concept to completion, ensuring timely delivery, cost efficiency, and high-quality outcomes. We follow globally recognized methodologies such as PMI, Agile, and PRINCE2, enabling us to tailor solutions according to the complexity and scale of each project.

<h2 class='service-sub-headings'>Our services include:</h2>
<ul>
<li><strong>Project Planning & Scheduling</strong>: Detailed project plans, timelines, and resource allocation.</li>
<li><strong>Risk Management</strong>: Identification, analysis, and mitigation of project risks.</li>
<li><strong>Stakeholder Communication</strong>: Regular updates and transparent reporting to all stakeholders.</li>
<li><strong>Quality Assurance</strong>: Ensuring deliverables meet the required quality standards.</li>
<li><strong>Agile & Scrum Implementation</strong>: Adopting flexible project management methodologies for better results.</li>
</ul>
With a focus on transparency, accountability, and measurable success, we empower organizations to achieve <br> their strategic goals while minimizing risks and maximizing ROI.

.`,


        mainImage: "img/portfolio/service detail/Project-Management.jpg",
        gallery: [

        ]
    },
        "Intelligent-transportantion": {
        title: "Intelligent Transportation Systems (ITS) & OBU Software Design Solutions",
        description: `Sphere Innovative Solutions FZCO specializes in delivering cutting-edge Intelligent Transportation Systems (ITS) and On-Board Unit (OBU) software design solutions. With a focus on innovation, reliability, and performance,
we provide tailored systems that enhance connectivity, efficiency, and seamless integration across transportation and mobility platforms.
<h2 class='service-sub-headings'>Our Expertise Includes:</h2>
<ul>
<li><strong></strong> Vehicular Communication Protocol Design</li>
<li><strong></strong> Embedded Module Specification (OBU)</li>
<li><strong></strong> ITS Platform Integration Component Development</li>
<li><strong></strong>Security and Data Encryption Framework</li>
<li><strong></strong>Middleware Integration</li>
<li><strong></strong>Urban Mobility Optimization</li>
<li><strong></strong>UI/UX Dashboard Design</li>
<li><strong></strong>Backend API Integration</li>
<li><strong></strong>Custom Localization Requirements</li>
</ul>
By providing opportunities to learn abroad, participants gain exposure to international business practices, innovative problem-solving techniques, and multicultural environments. These programs help professionals enhance their career growth, expand their networks, and bring fresh perspectives back to their organizations.`,

        mainImage: "img/portfolio/service detail/Professional-Management.jpg",
        gallery: [

        ]
    },
    
    

};


// Selecting elements once
const listItems = document.querySelectorAll('#servicesList li');
const contentTitle = document.getElementById('contentTitle');
const contentDescription = document.getElementById('contentDescription');
const mainImage = document.getElementById('mainImage');
const gallery = document.getElementById('gallery');

// Function to update content based on selected service
function updateContent(key) {
    if (!servicesData[key]) return;

    const service = servicesData[key];
    contentTitle.textContent = service.title;
    contentDescription.innerHTML = service.description;
    mainImage.src = service.mainImage;
    mainImage.alt = service.title;

    // Clear gallery and add new images
    gallery.innerHTML = '';
    service.gallery.forEach(imgSrc => {
        const img = document.createElement('img');
        img.src = imgSrc;
        img.alt = service.title + " image";
        img.style.width = "48%"; // Two images side by side with some gap
        img.style.margin = "1% 1% 1% 0";
        img.style.borderRadius = "8px";
        gallery.appendChild(img);
    });
}

// Add click event listeners
listItems.forEach(item => {
    item.addEventListener('click', function (e) {
        e.preventDefault();
        const contentId = this.getAttribute('data-content');

        // Remove active class from all items
        listItems.forEach(li => li.classList.remove('active'));
        // Add active class to clicked item
        this.classList.add('active');
        // Update content
        updateContent(contentId);

        // Scroll to content area on mobile
        if (window.innerWidth <= 991) {
            // Get the content area element
            const contentArea = document.querySelector('.content-area');
            if (contentArea) {
                // Calculate the position to scroll to
                const headerOffset = 30; // Adjust this value based on your header height
                const elementPosition = contentArea.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                // Smooth scroll to the content area
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Initialize with first active service content on page load
document.addEventListener('DOMContentLoaded', () => {
    const activeItem = document.querySelector('#servicesList li.active');
    if (activeItem) {
        updateContent(activeItem.getAttribute('data-content'));
    }
});

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    // Simple validation feedback for demonstration
    const form = e.target;
    if (!form.fullName.value.trim()) {
        alert('Please enter your full name.');
        form.fullName.focus();
        return;
    }
    if (!form.email.value.trim() || !form.email.validity.valid) {
        alert('Please enter a valid email address.');
        form.email.focus();
        return;
    }
    alert('Thank you for reaching out, we will get back to you shortly!');
    form.reset();
});

// Service Handler
document.addEventListener('DOMContentLoaded', function() {
    // Get all service list items
    const serviceItems = document.querySelectorAll('#servicesList li');
    
    // Add click event to each service item
    serviceItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            serviceItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Get the content ID from data attribute
            const contentId = this.getAttribute('data-content');
            
            // Update URL hash
            if (history.pushState) {
                window.history.pushState(null, null, `#${contentId}`);
            } else {
                window.location.hash = `#${contentId}`;
            }
            
            // Trigger content update
            if (window.updateContent) {
                window.updateContent(contentId);
            }
        });
    });
    
    // Handle initial load with hash
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            const targetItem = document.querySelector(`#servicesList li[data-content="${hash}"]`);
            if (targetItem) {
                targetItem.click();
            }
        } else if (serviceItems.length > 0) {
            // Default to first item if no hash
            serviceItems[0].click();
        }
    }
    
    // Initial load
    handleHashChange();
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', handleHashChange);
});




