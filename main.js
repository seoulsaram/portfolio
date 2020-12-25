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
