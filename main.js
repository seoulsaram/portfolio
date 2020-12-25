'use strict';


// Make navbar transparent when it is on the top

//스크롤을 내리면 nav바의 색이 변하게.
//이 때 nav bar의 height만큼 크스롤이 되면 색이 변하게 해야 하므로
//nav bar의 height을 알아내야 함.
//스크롤이 될 때마다 이벤트를 실행해조
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
   console.log(window.scrollY);
   console.log(`navbar : ${navbarHeight}`);
   if(window.scrollY > navbarHeight){
       navbar.classList.add('navbar--dark');
       //스크롤링이 nav bar이상으로 진행되면 진하게 만들자.
       //클래스이름을 navbar--dark로 변경되도록 함.
   }else{
    navbar.classList.remove('navbar--dark');
    //스크롤링이 nav bar 길이 이하로 다시 올라오면 지우자.
   }
});
//window.scrollY는 스크롤이 y축 즉 세로로 내려갈 때
//내려가진 만큼의 길이를 측정해준다.
//getBoundingClientRect : 엘리먼트의 크기와 위치를 알고싶을 때 사용.
//테두리를 제외한 안의 사각형 크기만 알고싶을 경우
//ClientWidth, ClientHeight를 사용한다. padding도 포함한 크기가 나온다.
//ex) element.clientWidth



// Handle scrolling when tapping on the navbar menu
const navbarMenu = document.querySelector('.navbar__menu');
navbarMenu.addEventListener('click', (event) => {
    //클릭된 이벤트가 들어오고
    //클릭이 된 아이템의 요소를 가져올 땐 event.target
    const target = event.target;
    const link = target.dataset.link;
    if(link == null){
        //target의 영역이 navbar 메뉴 영역이라서,
        //dataset이 들어있지 않은 부분을 클릭했을 때에도
        //어떤 작업이 이루어지기 때문에, dataset을 넣은 부분,
        //즉 메뉴 이름을 눌렀을 때에만 작동되도록
        //만약 dataset-link라는 속성이 null(안들어있다면)이라면
        //아무작업도 하지 않는다.
        return;
    }
    scrollIntoViews(link);
});
//scrollIntoView : element의 id를 가져와서 그 id에 scrollIntoView()를 붙이면
//그 id가 있는 곳으로 scroll해준다. behavior: "smooth" 는 부드럽게 이동.


//Contact Me로 스크롤 이동
const contactMe = document.querySelector('.home__contact');
contactMe.addEventListener('click', () => {
    scrollIntoViews('#contact');
})

// 반복되는 코드를 함수로 만들기
function scrollIntoViews(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
}