
// finction delete class active and add class active fron any navigation
function activeAddDelete(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    // add active class to color selected if data color === local storage color value
    ev.target.classList.add("active");
}



//check if ther is local storage color option
let mainColors = localStorage.getItem("color_option");
if( mainColors !== null ) {
    document.documentElement.style.setProperty('--main-color', mainColors);
    
    document.querySelectorAll(".color-list li").forEach(li => {
        if(li.dataset.color == mainColors ) {
            li.classList.add('active');
        }
    });
} else {
    document.querySelectorAll(".color-list li").forEach(li => {
        if(li.dataset.color == '#E3B149' ) {
            li.classList.add('active');
        }
    });
}

// on click toggle gear do -> set settings-box left 0 & set gear spin
document.querySelector(".toggle-settings .fa-gear").onclick = function() {
    this.classList.toggle("fa-spin");
    document.querySelector(".setting-box").classList.toggle('open');
};



// switch color theme
const colorsLi = document.querySelectorAll(".color-list li");
colorsLi.forEach(li => {
    li.addEventListener( 'click', (e) => {
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);  
        localStorage.setItem("color_option", e.target.dataset.color);
        activeAddDelete(e);
    });
});



let backgroundOption = true;
let backgroundInterval;

let backgroundLocalItem = localStorage.getItem('background_option');
if(backgroundLocalItem !== null){
    if(backgroundLocalItem == 'true'){
        backgroundLocalItem = true
    } else {
        backgroundLocalItem = false
    }
    
    document.querySelectorAll(".random-backdround span").forEach( element => {
        element.classList.remove('active')
    });
    if( backgroundLocalItem === 'true' ){
        document.querySelector('.random-backdround .yes').classList.add('active');
    }else{
        document.querySelector('.random-backdround .no').classList.add('active');
    }
}

// switch backdround active class
const randomBgEl = document.querySelectorAll(".random-backdround span");
randomBgEl.forEach(span => {
    span.addEventListener( 'click', (e) => {

        activeAddDelete(e);

        if( e.target.dataset.backdround === 'Yes' ) {
            backgroundOption = true;
            randomaizeImg();
            localStorage.setItem('background_option', true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem('background_option', false);
        }
    });
});

// set wallpaper change randomly (yes or no button)

function randomaizeImg() {
    if ( backgroundOption === true) {
        let landingPage = document.querySelector('.landing-page');
        let arrayImgs = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg'];
        backgroundInterval = setInterval(() => {
            let randomNumber = Math.floor( Math.random() * arrayImgs.length+1 );
            landingPage.style.backgroundImage = `url('../images/${randomNumber}.jpg')`
        }, 5000)
    } else {
        backgroundOption = false;
    }
}


// when arrived to my skills box do things
let mySkills = document.querySelector(".container");

window.onscroll = function () {
    let skillOffsetTop = mySkills.offsetTop; 
    let skillsOuterHeight = mySkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.pageYOffset;
    
    let calc = skillOffsetTop + skillsOuterHeight - windowHeight;
    if (windowScrollTop+380 > calc) {
        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");
        allSkills.forEach( skill => {
            skill.style.width = skill.dataset.progress
        });
    }
    
}



// Create Popup with the image
let gallery = document.querySelectorAll(".gallery img");

gallery.forEach(img => {
    img.addEventListener('click', (e) => {
        // create black bg
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay);

        
        //create popup image
        let popupBox = document.createElement('div');
        popupBox.className = 'popup-box';
        let popupImage = document.createElement('img');

        // add header for popup img
        if( img.alt !== null ){
            let headerImg = document.createElement('h3');
            let imgText = document.createTextNode(img.alt);
            headerImg.appendChild(imgText);
            popupBox.appendChild(headerImg);
        } else {
            
        }

        //take src from click img to new popup image
        popupImage.src = img.src;

        // add img to popup box and popup box to body
        popupBox.appendChild(popupImage);
        document.body.appendChild(popupBox);

        // create close span
        let closeButton = document.createElement('span');
        let textCloseButton = document.createTextNode('×');        
        closeButton.appendChild(textCloseButton);
        popupBox.appendChild(closeButton)
        closeButton.className = 'closeButton';        
    })
});

// close Popup
document.addEventListener('click', (e) => {
    if( e.target.className == 'closeButton' ){
        document.querySelector('.popup-box').remove();
        document.querySelector('.popup-overlay').remove();
    }
});
document.addEventListener('click', (e) => {
    if( e.target.className == 'popup-overlay' ){
        document.querySelector('.popup-box').remove();
        document.querySelector('.popup-overlay').remove();
    }
});




// function for each navigation
function scrollNaigation ( items ) {
    items.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
// nav bullets 
const bullets = document.querySelectorAll('.nav-bullets .bullet');
scrollNaigation(bullets);


// main navigation 
const navItems = document.querySelectorAll('.links a');
scrollNaigation(navItems);


// show and hidden bullets
let bulletsOptions = document.querySelectorAll('.show-bullets span');
let navBullets = document.querySelector('.nav-bullets');
let bulletLocalStorage = localStorage.getItem('bullet-option')
if(bulletLocalStorage != null) {
    bulletsOptions.forEach(span => {
        span.classList.remove('active')
    })
    if(bulletLocalStorage === 'block'){
        navBullets.style.display = 'block';
        document.querySelector('.show-bullets span.yes').classList.add('active');
    }else{
        navBullets.style.display = 'none';
        document.querySelector('.show-bullets span.no').classList.add('active');
    }
}


bulletsOptions.forEach(span => {
    span.addEventListener('click', (e) => {
        activeAddDelete(e);
        if(span.dataset.display === 'show'){
            navBullets.style.display = 'block';
            localStorage.setItem('bullet-option', 'block');
        }else{
            navBullets.style.display = 'none';
            localStorage.setItem('bullet-option', 'none');
        }
    })
});


// reset options

document.querySelector('.reset-options').onclick = function() {
    localStorage.removeItem('color_option');
    localStorage.removeItem('background_option');
    localStorage.removeItem('bullet-option');
    window.location.reload();
}