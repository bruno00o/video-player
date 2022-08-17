// Variables

const playImage = document.getElementById('play-img');
const video = document.querySelector('video');
const pause_button = document.getElementById('play_button');
const toggleButton = document.getElementById('toggle-button');
const sideBar = document.getElementById('side-bar');
const title = document.getElementById('title');
const nextButton = document.getElementById('next_button');
const liList = document.getElementsByTagName('li');
const scrollDiv = document.querySelector('ul');
const section = document.querySelector('section');
const ulList = document.getElementsByTagName('ul');
const labelList = document.getElementsByTagName('label');

const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");

const optionsList = document.querySelectorAll(".option");

selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
});

optionsList.forEach(o => {
    o.addEventListener("click", () => {
        selected.innerHTML = o.querySelector("label").innerHTML;
        localStorage.setItem('season', selected.innerHTML);
        optionsContainer.classList.remove("active");
        let season = (selected.innerHTML);
        for (let i = 0; i < ulList.length; i++) {
            ulList[i].style.display = 'none';
        }
        let ulSeason = document.getElementById(season);
        ulSeason.style.display = 'block';
    });
});


// Met la video en fonction du LocalStorage

let titleStorage = localStorage.getItem('title')
let videoStorage = localStorage.getItem('video')
let seasonStorage = localStorage.getItem('season');


if (titleStorage == null) {
    title.innerHTML = liList[0].textContent;
} else {
    title.innerHTML = titleStorage;
};

if (videoStorage == null) {
    video.setAttribute('src', "videos/" + labelList[0].innerHTML + "/" + liList[0].textContent + ".mp4" + '#t=' + (localStorage.getItem('time') - 5).toString());
    let elem = liList[0];
    elem.style.fontWeight = '600';
    elem.style.color = 'white';
} else {
    video.setAttribute('src', videoStorage + '#t=' + (localStorage.getItem('time') - 5).toString());
    for (let i = 0; i < liList.length; i++) {
        if (liList[i].textContent == videoStorage.slice(10, videoStorage.search('mp4') - 1)) {
            let elem = liList[i];
            elem.style.fontWeight = '600';
            elem.style.color = 'white';
            scrollDiv.scroll(0, elem.offsetTop - 100);
            break;
        }
    }

};

if (seasonStorage == null) {
    selected.innerHTML = labelList[0].textContent;
    let season = (selected.innerHTML);
    for (let i = 0; i < ulList.length; i++) {
        ulList[i].style.display = 'none';
    }
    let ulSeason = document.getElementById(season);
    ulSeason.style.display = 'block';
} else {
    selected.innerHTML = seasonStorage;
    let season = (selected.innerHTML);
    for (let i = 0; i < ulList.length; i++) {
        ulList[i].style.display = 'none';
    }
    let ulSeason = document.getElementById(season);
    ulSeason.style.display = 'block';
};

if (localStorage.getItem('time') >= 21 * 60) {
    nextVideo()
}

// Démarre la video si clic sur l'image

function click_on_image() {

    playImage.style.display = 'none';
    pause_button.style.display = 'none';
    video.style.display = 'block';
    video.play()
};

function disapear(elem) {
    elem.style.visibility = 'hidden';
    window.location.reload(true);
};

playImage.addEventListener('click', click_on_image);

pause_button.addEventListener('click', click_on_image);

// Sidebar

toggleButton.addEventListener('click', show);

function show() {
    sideBar.classList.toggle('active');
};

const page = document.getElementById('main');

page.addEventListener('click', () => {
    sideBar.classList.remove('active');
});

// Change video quand clic sur element liste

const ext = '.mp4'

function change_video(elem) {
    if (typeof elem === "string") {
        var txtvideo = elem;
        for (let i = 0; i < liList.length; i++) {
            if (liList[i].innerHTML == elem) {
                var saison = (liList[i].parentElement.id);
            }
        }
    } else {
        var txtvideo = elem.textContent;
        var saison = elem.parentElement.id;
        sideBar.classList.toggle('active');
    }
    title.innerHTML = txtvideo;
    localStorage.setItem('title', txtvideo);
    txtvideo = 'videos/' + saison + '/' + txtvideo + ext;
    selected.innerHTML = saison;
    let season = (selected.innerHTML);
    for (let i = 0; i < ulList.length; i++) {
        ulList[i].style.display = 'none';
    }
    let ulSeason = document.getElementById(season);
    ulSeason.style.display = 'block';
    localStorage.setItem('video', txtvideo);
    video.setAttribute('src', txtvideo);
    video.load();
    playImage.style.display = 'block';
    pause_button.style.display = 'block';
    video.style.display = 'none';
    for (let i = 0; i < liList.length; i++) {
        liList[i].removeAttribute('style');
    }
    if (typeof elem == 'string') {
        for (let i = 0; i < liList.length; i++) {
            if (liList[i].textContent == elem) {
                elem = liList[i];
                break;
            }
        }
    }
    elem.style.fontWeight = '600';
    elem.style.color = 'white';

};

function getEpList() {
    let = epList = [];
    for (let i = 0; i < liList.length; i++) {
        epList.push(liList[i].textContent);
    }
    return epList;
}

function getEpWatching() {
    let thisEp = video.outerHTML;
    thisEp = containsString("mp4", thisEp.split("/"));
    thisEp = (thisEp.slice(0, thisEp.search('mp4') - 1));
    return thisEp;
}


// Enregistre toutes les secondes le temps dans la vidéo

video.addEventListener('playing', () => {
    let epList = getEpList();
    let thisEp = getEpWatching();
    if (epList.indexOf(thisEp) != epList.length - 1) {
        setInterval(watchVideo, 1000);
    }
    else {
        nextButton.style.visibility = "hidden";
    }
});


function watchVideo() {
    localStorage.setItem('time', video.currentTime);
    if (video.currentTime >= (video.duration - video.duration * .2)) {
        nextVideo();
    } else {
        nextButton.style.visibility = "hidden";
    }
}

function nextVideo() {
    nextButton.style.visibility = "visible";
}

function containsString(str, list) {
    for (let i = 0; i < list.length; i++) {
        if (list[i].search(str) != -1) {
            return list[i];
        }
    }
    return false;
}

nextButton.addEventListener('click', next_video);

function next_video() {
    let = epList = getEpList();
    let thisEp = getEpWatching();
    thisEp = (epList.indexOf(thisEp));
    change_video(epList[thisEp + 1])
}

for (let i = 0; i < liList.length; i++) {
    if (liList[i].textContent == title.innerHTML) {
        liList[i].style.fontWeight = "600";
        liList[i].style.color = "white";
    }
}



// add source mp4 compatibility by adding document.write source
// add type video
// add button ends soon to watch the next (liste des li, détecter on est auquel et mettre +1)