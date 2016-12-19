(function(){
	var oContainer = document.getElementById('container');	
	var oPrev = document.getElementById('prev');	
	var oNext = document.getElementById('next');	
	var	ROW = 4,
	    COL = 6,
		NUM = COL * ROW,
		BIG_IMG_WIDTH = 750,
		BIG_IMG_HEIGHT = 500,
		THUMB_IMG_WIDTH = THUMB_IMG_HEIGHT = 125;
	var iLoaded = 0;
	var bClicked = false;
	var iNow = 0;
	//图片预加载
	for(var i=1; i<=NUM; i++){
		var oBigImg = new Image();
		oBigImg.src = 'img/' +i+ '.jpg';
		oBigImg.onload = function(){
			if(++iLoaded == NUM*2){
				onloadSuccess();
			}
		};
		var oThumbImg = new Image();
		oThumbImg.src = 'img/thumbs/' +i+ '.jpg';
		oThumbImg.onload = function(){
			if(++iLoaded == NUM*2){
				onloadSuccess();
			}
		};
	};
	function onloadSuccess(){
		var index = 0;
		var iRowGap = (oContainer.offsetHeight - (THUMB_IMG_HEIGHT * ROW)) / (ROW + 1);
		var iColGap = (oContainer.offsetWidth - (THUMB_IMG_WIDTH * COL)) / (COL + 1); 
		for(var i=0; i<ROW; i++){
			for(var j=0; j<COL; j++){
				var oDiv = document.createElement('div');
				oDiv.pos = {
					left: parseInt(iColGap * (j+1) + j * THUMB_IMG_WIDTH),
					top: parseInt(iRowGap * (i+1) + i * THUMB_IMG_HEIGHT)
				};
				oDiv.matrix = {
					col:j,
					row:i
				};
				oDiv.index = index;
				oDiv.style.left = (-Math.random() * 300 - 200) + 'px';
				oDiv.style.top = (-Math.random() * 300 - 200) + 'px';
				oDiv.style.width = THUMB_IMG_WIDTH + 'px';
				oDiv.style.height = THUMB_IMG_HEIGHT + 'px';
				oDiv.className = 'img';
				oDiv.style.background = 'url(img/thumbs/'+(index+1)+'.jpg)';
				oContainer.appendChild(oDiv);
				oDiv.innerHTML = '<span></span>';
				index++;
			}
		}
		var aImg = document.getElementsByClassName('img');
		index--;
		var timer = setInterval(function(){
			aImg[index].style.left = aImg[index].pos.left + 'px';
			aImg[index].style.top = aImg[index].pos.top + 'px';
			setStyle3d(aImg[index], 'transform', 'rotate('+(Math.random() * 40 - 20)+'deg)');
			aImg[index].addEventListener('click', clickHandler, false);
			index--;
			if(index == -1){
				clearInterval(timer);
			}
		},100);
		function clickHandler(){
			if(bClicked){//分散
				for(var i=0; i<aImg.length; i++){
					var oSpan = aImg[i].getElementsByTagName('span')[0];
					aImg[i].style.left = aImg[i].pos.left + 'px'; 
					aImg[i].style.top = aImg[i].pos.top + 'px';
					setStyle3d(aImg[i],'transform','rotate('+(Math.random() * 40 - 20)+'deg)');
					aImg[i].className = 'img';
					oSpan.style.opacity = 0;
				}
				oPrev.style.display = oNext.style.display = 'none';
			}else{//合并
				var bigImgPos = {
					left:(oContainer.offsetWidth - BIG_IMG_WIDTH) / 2,
					top:(oContainer.offsetHeight - BIG_IMG_HEIGHT) / 2
				};
				for(var i=0; i<aImg.length; i++){
					var oSpan = aImg[i].getElementsByTagName('span')[0];
					oSpan.style.background = 'url(img/'+(this.index + 1)+'.jpg)'+(-aImg[i].matrix.col * THUMB_IMG_WIDTH) + 'px ' + (-aImg[i].matrix.row * THUMB_IMG_HEIGHT) + 'px';
					aImg[i].style.left = bigImgPos.left + aImg[i].matrix.col * (THUMB_IMG_WIDTH + 1) + 'px';
					aImg[i].style.top = bigImgPos.top + aImg[i].matrix.row * (THUMB_IMG_HEIGHT + 1) + 'px';
					setStyle3d(aImg[i],'transform','rotate(0deg)');
					aImg[i].className = 'img piece';
					oSpan.style.opacity = 1;
				}
				oPrev.style.display = oNext.style.display = 'block';
			}
			bClicked = !bClicked;
		}
		oPrev.onclick = oNext.onclick = function(){
			if(this == oPrev){
				iNow--;
				if(iNow == -1){
					iNow = NUM - 1;
				}
			}else{
				iNow++;
				if(iNow == NUM){
					iNow = 0;
				}
			}
			var arr = [];
			for(var i=0; i<NUM; i++){
				arr.push(i);
			}
			arr.sort(function(){
				return Math.random() - 0.5;
			});
			var timer = setInterval(function(){
				var item = arr.pop();
				aImg[item].getElementsByTagName('span')[0].style.background = 'url(img/'+(iNow + 1)+'.jpg) '+ (-aImg[item].matrix.col * THUMB_IMG_WIDTH) + 'px ' + (-aImg[item].matrix.row * THUMB_IMG_HEIGHT) + 'px';
				if(arr.length == 0){
					clearInterval(timer);
				}
			},30);
		};
		function setStyle3d(elem, attr, value){
			['Webkit', 'Moz', 'Ms', 'O', ''].forEach(function(prefix){
				elem.style[prefix + attr.charAt(0).toUpperCase() + attr.substr(1)] = value;
			})
		}
	};
})();