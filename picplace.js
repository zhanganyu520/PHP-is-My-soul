// 执行加载完html之后的 JavaScript脚本
function addLoadEvent(func){
    var oldonload = window.onload;
    if(typeof window.onload != 'function'){
        window.onload = func;
    }else{
        window.onload = function(){
            oldonload();
            func();
        }
    }
}
addLoadEvent(preparePlaceholder);
addLoadEvent(prepareGallery);

/*
* 对图片进行切换加载
* 对图片描述进行切换加载
*/
function showPic(whichpic){
    /*
    * 图片的切换
    */
    // ev.preventDefault();

    if(!document.getElementById("placeholder"))return true;
    var source = whichpic.getAttribute("href");
    var placeholder = document.getElementById('placeholder');
    // if(placeholder.nodeName != "IMG") return true;
    placeholder.setAttribute('src',source);
    /*
    * 图片的描述切换
    */
    if(!document.getElementById("description"))return false;
    if(whichpic.getAttribute("title")){
        var text = whichpic.getAttribute("title");
    }else{
        var text = "";
    }
    var description = document.getElementById('description');
    // console.log(description.childNodes);
    if( description.firstChild.nodeType == 3){
        description.firstChild.nodeValue = text;
    }
    return false;
}
function prepareGallery(){
    if(!document.getElementById || !document.getElementsByTagName) return false;
    if(!document.getElementById("imagegallery"))return false;
    var gallery = document.getElementById("imagegallery");
    var links = gallery.getElementsByTagName("a");
    // console.log(links);return;
    for (var i = 0; i < links.length; i++){
        links[i].onclick = function(){
            return showPic(this);
        };
        links[i].onkeypress = links[i].onclick;
    }
}


// function countBodyChildren(){
//     var body_element = document.getElementsByTagName("body")[0];
// //    console.log(body_element);
//     alert(body_element.childNodes.length);
// }
// window.onload = countBodyChildren;
// window.onload = prepareLinks();
// function popUp(WinURL){
//
//     window.open(WinURL,"POPUP","width=320,height=480");
// }
//
// function prepareLinks(){
//     var links = document.getElementsByTagName("a");
//     // console.log(links);
//     for(var i = 0; i < links.length; i++){
//         if(links[i].className == "popup"){
//             alert('1212121212');
//             links[i].onclick = function(){
//                 popUp(this.getAttribute("href"));
//                 return false;
//             }
//         }
//     }
// }

/**
 * 动态创建一个gallery html
 */
function preparePlaceholder(){
    if(!document.createElement) return false;
    if(!document.createTextNode) return false;
    if(!document.getElementById) return false;
    if(!document.getElementById('imagegallery')) return false;

    var placeholder = document.createElement("img");
    placeholder.setAttribute('id','placeholder');
    placeholder.setAttribute('src',"images/placeholder.jpg");
    placeholder.setAttribute('alt','my image gallery');
    var description = document.createElement('P');
    description.setAttribute('id','description');
    var text = document.createTextNode("choose an image");
    description.appendChild(text);

    var gallery = document.getElementById('imagegallery');
    insertAfter(placeholder,gallery);
    insertAfter(description,placeholder);
    // gallery.parentNode.insertBefore(placeholder,gallery);
    // gallery.parentNode.insertBefore(description,gallery);

    // document.getElementsByTagName("body")[0].appendChild(placeholder);
    // document.getElementsByTagName("body")[0].appendChild(description);

}
/*
* 在指定元素的后面添加元素*/
function insertAfter(newElement,targetElement){
    var parent = targetElement.parentNode;
    if(parent.lastChild == targetElement){
        parent.appendChild(newElement);
    }else{
        parent.insertBefore(newElement,targetElement.nextSibling);
    }
}





























