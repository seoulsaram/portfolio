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
    console.log(filter);
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












// 스크롤 되는 섹션에 맞는 메뉴가 활성화되게 만들기.

// 1. 모든 섹션 요소들과 메뉴아이템들을 가져온다.
const sectionIds = ['#home', '#about', '#skills', '#work', '#testimonial', '#contact',];
const sections = sectionIds.map(id => document.querySelector(id));
//각 섹션의 id를 배열형태로 만들고
//이 배열을 map을 통해 id라는 이름으로 쿼리셀렉터로 요소찾을 때 넣는다.
//그럼 map이 배열의 길이만큼 뺑글뺑글 돌면서 document.querySelector를 실행하여
//각각의 돔요소를 찾아 새로운 배열로 만든다.
const navItems = sectionIds.map(id => document.querySelector(`[data-link="${id}"]`));
//nav메뉴에는 각 섹션에 해당하는 id가 data-link= 에 담겨있기 때문에 위와같이 찾아온다.
//속성값을 받아올 때는 []를 사용
console.log(navItems);

// 2. IntersectionObserver를 이용해서 모든 섹션들을 관찰한다.
let selectedNavIndex = 0;
let selectedNavItem = navItems[0];
function selectNavItem(selected){
    selectedNavItem.classList.remove('active');
    selectedNavItem = selected;
    //배열로 찾아진 네비게이션메뉴 중에서 찾아온 인덱스값을 넣어주고
    //찾아진 인덱스에 클래스명 'active'를 추가해준다.
    selectedNavItem.classList.add('active');
}

// 반복되는 코드를 함수로 만들기
function scrollIntoViews(selector){
    const scrollTo = document.querySelector(selector);
    scrollTo.scrollIntoView({behavior : "smooth"});
    selectNavItem(navItems[sectionIds.indexOf(selector)]);
}


const observerOptions = {
    root : null,
    rootMargin: '0px',
    threshold: 0.3,
};

const observerCallback = (entries, observer) => {
    entries.forEach(entry => {
        if(!entry.isIntersecting && entry.intersectionRatio > 0){
            //요소가 화면으로 들어오고있지 않는 상태라면~
            //페이지가 로드되면 바로 페이지 밖으로 나가지는 섹션들 때문에 해당 섹션들에 대해
            //콜백함수가 실행되어 처음 로드됐을 때 선택되어지는 nav메뉴가 엉뚱한 것이 될 수 있으므로
            //entry가 isIntersecting이 아니고, 밖으로 나가고 지금 현재의 entry에 intersectionRatio가
            //무조건 0 이상인 아이들에 한해서만 처리해준다는 조건을 줌.
            const index = sectionIds.indexOf(`#${entry.target.id}`);
            //해당 섹션의 인덱스를 entry.target.id를 통해 가져오고
            
            //요소의 크기와 위치의 y축이 마이너스일 때, 즉 위쪽 방향으로 윈도우 바깥으로 나갔을 때
            if(entry.boundingClientRect.y < 0){
                //요소의 나가고있는 인덱스의 다음요소(+1)를 찾는다.
                selectedNavIndex = index + 1;
            }else{
                selectedNavIndex = index - 1;
            }
        }
    });
    //해당하는 섹션을 찾아 navbar메뉴를 활성화하는 기능을 넣기
    //섹션이 위로 또는 아래로 빠질 때 각각 위, 아래에 해당하는 섹션을 활성화 하면 됨.
    //즉 위로 빠지면 위로 빠지는 그 다음섹션을.
};
const observer = new IntersectionObserver(observerCallback, observerOptions);
sections.forEach(section => observer.observe(section));

// 3. 보여지는 섹션에 해당하는 메뉴 아이템을 활성화 시킨다.
function selectNavMenu(){
     //scroll, wheel의 차이
    //scroll은 자동으로 이루어지는 스크롤링
    //wheel은 사용자가 마우스나 트랙패드로 스크롤을 직접 했을경우의 차이.
    //scroll은 우리가 메뉴 선택 시 왔다갔다 하는 때에도 이루어지지만
    //wheel은 사용자가 마우스를 움직일 때만 발생
    if(window.scrollY === 0){
        selectedNavIndex = 0;
    } else if(Math.round(window.scrollY + window.innerHeight >= document.body.clientHeight)){
        //스크롤이 제일 밑으로 도달했다면~
        //(window.scrollY + window.innerHeight >= document.body.clientHeight)
        //위의 공식은 scrollY와 window창의 innerHeight값을 더한 값이 정확하게 일치하지 않는 경우가
        //있다. document.doby.clientHeight은 1270일 수 있고,
        //scrollY와 window창의 innerHeight더한 값은 1269.2이런 식으로 소수점이
        //나올 수 있다. 그러므로 더한값을 반올림해주면 1270이 된다.
        selectedNavIndex = navItems.length - 1;
    }
    selectNavItem(navItems[selectedNavIndex]);

}


window.addEventListener('wheel', () => selectNavMenu());

window.addEventListener('keyup', () => selectNavMenu());




