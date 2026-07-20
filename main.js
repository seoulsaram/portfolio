'use strict';

// Make navbar transparent when it is on the top

//스크롤을 내리면 nav바의 색이 변하게.
//이 때 nav bar의 height만큼 크스롤이 되면 색이 변하게 해야 하므로
//nav bar의 height을 알아내야 함.
//스크롤이 될 때마다 이벤트를 실행해조
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  //console.log(window.scrollY);
  //console.log(`navbar : ${navbarHeight}`);
  if (window.scrollY > navbarHeight) {
    navbar.classList.add('navbar--dark');
    //스크롤링이 nav bar이상으로 진행되면 진하게 만들자.
    //클래스이름을 navbar--dark로 변경되도록 함.
  } else {
    navbar.classList.remove('navbar--dark');
    //스크롤링이 nav bar 길이 이하로 다시 올라오면 지우자.
  }
});

// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
  //클릭된 이벤트가 들어오고
  //클릭이 된 아이템의 요소를 가져올 땐 event.target
  const target = event.target;
  const link = target.dataset.link;
  if (link == null) {
    return;
  }
  navbarMenu.classList.remove('open');
  scrollIntoViews(link);
  selectNavItem(target);
});
//scrollIntoView : element의 id를 가져와서 그 id에 scrollIntoView()를 붙이면
//그 id가 있는 곳으로 scroll해준다. behavior: "smooth" 는 부드럽게 이동.

//작은 화면 메뉴 버튼 토글
const navbarToggleBtn = document.querySelector('.navbar__toggle-btn');
navbarToggleBtn.addEventListener('click', () => {
  navbarMenu.classList.toggle('open');
});

//Contact Me로 스크롤 이동
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
  scrollIntoViews('#contact');
});

//스크롤링이 되면 home이 점점 투명해지는 효과(내릴수록 투명도가 증가해야 함.)
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', () => {
  home.style.opacity = 1 - window.scrollY / homeHeight;
});

//스크롤을 하면 화살표 버튼 나타나게 하기
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', () => {
  if (window.scrollY > homeHeight / 2) {
    //home 높이의 반만큼만 스크롤이 내려갔을 때 효과주기
    arrowUp.classList.add('visible');
  } else {
    arrowUp.classList.remove('visible');
  }
});

arrowUp.addEventListener('click', () => {
  scrollIntoViews('#home');
});

//프로젝트
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');

// 스크롤 되는 섹션에 맞는 메뉴가 활성화되게 만들기.

// 1. 모든 섹션 요소들과 메뉴아이템들을 가져온다.
const sectionIds = [
  '#home',
  '#about',
  '#experience',
  '#testimonial',
  '#contact',
];
const sections = sectionIds.map((id) => document.querySelector(id));
//각 섹션의 id를 배열형태로 만들고
//이 배열을 map을 통해 id라는 이름으로 쿼리셀렉터로 요소찾을 때 넣는다.
//그럼 map이 배열의 길이만큼 뺑글뺑글 돌면서 document.querySelector를 실행하여
//각각의 돔요소를 찾아 새로운 배열로 만든다.
const navItems = sectionIds.map((id) =>
  document.querySelector(`[data-link="${id}"]`),
);
//nav메뉴에는 각 섹션에 해당하는 id가 data-link= 에 담겨있기 때문에 위와같이 찾아온다.
//속성값을 받아올 때는 []를 사용

// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected) {
  selectedNavItem.classList.remove('active');
  selectedNavItem = selected;
  //배열로 찾아진 네비게이션메뉴 중에서 찾아온 인덱스값을 넣어주고
  //찾아진 인덱스에 클래스명 'active'를 추가해준다.
  selectedNavItem.classList.add('active');
}

// 반복되는 코드를 함수로 만들기
function scrollIntoViews(selector) {
  const scrollTo = document.querySelector(selector);
  scrollTo.scrollIntoView({ behavior: 'smooth' });
  selectNavItem(navItems[sectionIds.indexOf(selector)]);
}

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.3,
};

const observerCallback = (entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting && entry.intersectionRatio > 0) {
      const index = sectionIds.indexOf(`#${entry.target.id}`);
      if (entry.boundingClientRect.y < 0) {
        //요소의 나가고있는 인덱스의 다음요소(+1)를 찾는다.
        selectedNavIndex = index + 1;
      } else {
        selectedNavIndex = index - 1;
      }
    }
  });
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach((section) => section && observer.observe(section));

// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
function selectNavMenu() {
  if (window.scrollY === 0) {
    selectedNavIndex = 0;
  } else if (
    Math.round(
      window.scrollY + window.innerHeight >= document.body.clientHeight,
    )
  ) {
    selectedNavIndex = navItems.length - 1;
  }
  selectNavItem(navItems[selectedNavIndex]);
}

window.addEventListener('wheel', () => selectNavMenu());

window.addEventListener('keyup', () => selectNavMenu());

// Key projects slider (manual button navigation)
const keyProjectsTrack = document.querySelector('.key-projects__track');
const keyProjectsViewport = document.querySelector('.key-projects__viewport');
const keyProjectsSlides = document.querySelectorAll('.key-project');
const keyProjectsPrevBtn = document.querySelector('.key-projects__arrow--prev');
const keyProjectsNextBtn = document.querySelector('.key-projects__arrow--next');
const keyProjectsBeamVideo = document.querySelector('.key-project video');

if (keyProjectsTrack && keyProjectsSlides.length > 1) {
  let currentSlideIndex = 0;
  let keyProjectsInView = false;
  const beamSlideIndex = keyProjectsBeamVideo
    ? Array.from(keyProjectsSlides).findIndex((slide) =>
        slide.contains(keyProjectsBeamVideo),
      )
    : -1;

  const resetBeamVideo = () => {
    if (!keyProjectsBeamVideo) return;
    keyProjectsBeamVideo.pause();
    keyProjectsBeamVideo.currentTime = 0;
  };

  const syncBeamVideoPlayback = () => {
    if (!keyProjectsBeamVideo || beamSlideIndex < 0) return;
    if (keyProjectsInView && currentSlideIndex === beamSlideIndex) {
      keyProjectsBeamVideo.play().catch(() => {});
    } else {
      resetBeamVideo();
    }
  };

  if (keyProjectsViewport) {
    const keyProjectsViewObserver = new IntersectionObserver(
      (entries) => {
        keyProjectsInView = entries[0].isIntersecting;
        syncBeamVideoPlayback();
      },
      { threshold: 0.35 },
    );
    keyProjectsViewObserver.observe(keyProjectsViewport);
  }

  const renderSlide = () => {
    keyProjectsTrack.style.transform = `translateX(-${currentSlideIndex * 100}%)`;
    syncBeamVideoPlayback();
  };

  const moveSlide = (direction) => {
    currentSlideIndex =
      (currentSlideIndex + direction + keyProjectsSlides.length) %
      keyProjectsSlides.length;
    renderSlide();
  };

  if (keyProjectsPrevBtn && keyProjectsNextBtn) {
    keyProjectsPrevBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      moveSlide(-1);
    });
    keyProjectsNextBtn.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      moveSlide(1);
    });
  }

  renderSlide();
}

// Highlight work experience cards on scroll
const experienceCards = document.querySelectorAll('.scroll-highlight');

if (experienceCards.length > 0) {
  const experienceObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle(
          'is-highlighted',
          entry.isIntersecting && entry.intersectionRatio > 0.35,
        );
      });
    },
    {
      threshold: [0.2, 0.35, 0.5],
      rootMargin: '-8% 0px -18% 0px',
    },
  );

  experienceCards.forEach((card) => experienceObserver.observe(card));
}
