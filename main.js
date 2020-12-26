'use strict';


// Make navbar transparent when it is on the top

//스크롤을 내리면 nav바의 색이 변하게.
//이 때 nav bar의 height만큼 크스롤이 되면 색이 변하게 해야 하므로
//nav bar의 height을 알아내야 함.
//스크롤이 될 때마다 이벤트를 실행해조
const navbar = document.querySelector('#navbar');
const navbarHeight = navbar.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
   //console.log(window.scrollY);
   //console.log(`navbar : ${navbarHeight}`);
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
    navbarMenu.classList.remove('open');
    scrollIntoViews(link);
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
})



//스크롤링이 되면 home이 점점 투명해지는 효과(내릴수록 투명도가 증가해야 함.)
const home = document.querySelector('.home__container');
const homeHeight = home.getBoundingClientRect().height;
document.addEventListener('scroll', ()=> {
    home.style.opacity = 1 - window.scrollY / homeHeight;
    //homeHeight이 800이라고 할 때 스크롤이 0(하나도 안내림)이면
    //0 / 800 = 0 이고 여기에 1을 빼면 1 = 100% (투명도 0)
    //스크롤이 400만큼 내려왔다면
    // 400 / 800 = 0.5 그리고 1 - 0.5 = 0.5 (즉 투명도 0.5 = 50% 주면 되고)
    // 스크롤 800이면 
    // 800 / 800 = 1, 1 - 1 = 0 완전투명
});



//스크롤을 하면 화살표 버튼 나타나게 하기
const arrowUp = document.querySelector('.arrow-up');
document.addEventListener('scroll', ()=> {
    if(window.scrollY > homeHeight/2){
        //home 높이의 반만큼만 스크롤이 내려갔을 때 효과주기
        arrowUp.classList.add('visible');
    } else {
        arrowUp.classList.remove('visible');
    }
});

arrowUp.addEventListener('click', () =>{
    scrollIntoViews('#home');
});



//프로젝트
const workBtnContainer = document.querySelector('.work__categories');
const projectContainer = document.querySelector('.work__projects');
const projects = document.querySelectorAll('.project');
workBtnContainer.addEventListener('click', (e) => {
    const filter = e.target.dataset.filter || e.target.parentNode.dataset.filter;
    //만약 dataset의 filter가 없다면 false이므로 만약 false라면
    //해당 노드의 부모 노드에서 dataset.filter를 찾아라.

    if(filter == null){
        return;
    }

    //클릭된 버튼 active 고정
    const active = document.querySelector('.category__btn.selected');
    active.classList.remove('selected');
    const target = e.target.nodeName === 'BUTTON' ? e.target :
                            e.target.parentNode;
    //지금 클릭된게 버튼이면 그냥 그 타겟을 쓰고, 아니면(스판이면) 부모노드(버튼)의 것을 쓴다.
    target.classList.add('selected');



    //work 이미지들이 뿜뿜하고 나오는 효과를 주기 위해 클래스 추가.
    projectContainer.classList.add('anim-out');
    //work이미지가 계속 투명한 채로 남아있기 때문에 300밀리세컨 뒤에 클래스이름을 지워서
    //투명효과를 없애기
    setTimeout(() => {
        projects.forEach((project) => {
            if(filter === '*' || filter === project.dataset.type){
                //filter가 *이거나 filter의 이름과 dataset-type의 이름이 같다면
                project.classList.remove('invisible');
            } else {
                project.classList.add('invisible');
            }
        });
        projectContainer.classList.remove('anim-out');
    }, 300);

});




// 반복되는 코드를 함수로 만들기
function scrollIntoViews(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
}



