{
    let $s = document.querySelector.bind(document);
    let spans = $s(".buttonContainer");
    let images = $s(".container");
    let main = $s(".main");
    // get the width of the picture and make it the distance of each movement;
    let distance = $s(".container img:nth-child(1)").offsetWidth;
    // get the number of the images before insert the first and last image;
    let length = images.children.length;
    // insert the first image in the end,
    // and insert the last picture in the beginning to make a infinite loop;
    let lastImageCopy = $s(`.container img:nth-child(${images.children.length})`).cloneNode(true);
    let firstImageCopy = $s(`.container img:nth-child(1)`).cloneNode(true);
    images.prepend(lastImageCopy);
    images.append(firstImageCopy);

    // initialization
    let preImage, targetImage;
    var index = 0;
    targetImage = 0;
    move(targetImage);

    // monitor the click event; click to move;
    spans.addEventListener("click",function(span){
        index = Array.prototype.indexOf.call(spans.children, span.target);
        slide(index);
    });
    // auto moving each 15000ms;

    let timer = setInterval(auto,1500);
    main.addEventListener("mouseenter",function(){
        window.clearInterval(timer);
    })
    main.addEventListener("mouseleave",function(){
        timer = setInterval(auto,1500);
    })
    function auto(){
        if(index > length -1 ){
            index = 0;
        }
        console.log(this,index);
        slide(index);
        index++;
    }
// how the images move;
    function slide(index){
        targetImage = index;
        // console.log(targetImage);
        // from last picture to the first
        if(preImage == length - 1 && targetImage == 0){
            console.log("last to first")
            move(preImage + 1);
            setTimeout(function(){
                // css tricky, if no clientHeight, css will combine display none and flex;
                images.clientHeight;
                images.setAttribute("style", `transform:translateX(-${distance}px); display: none;`);
                images.clientHeight;
                images.style.display = "flex";
            },500)
        }else if(preImage == 0&& targetImage == length - 1){
            move(preImage - 1);
            console.log("first to last")
            setTimeout(function(){
                images.clientHeight;
                images.setAttribute("style", `transform:translateX(-${(length)*distance}px); display: none;`);
                images.clientHeight;
                images.style.display = "flex";
            },500)
        }else{
            move(targetImage);
        }
    }
    function move(index){
        // use index >= 0 to make sure users click the button instead of any other blanket places;
        if(index >= 0){
            index = index + 1;
            images.setAttribute("style","transform:translateX(" + (-index*distance) + "px)");
            preImage = targetImage;
        }
        return preImage, targetImage;
    }
}