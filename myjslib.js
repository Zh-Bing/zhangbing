function getById(elemId){
	return document.getElementById(elemId);
}

function getByClass(clsName, context, tag){
	var result = [];
	context = context || document;
	tag = tag || '*';
	var arr = context.getElementsByTagName(tag);
	for(var i=0; i<arr.length; i++){
		var re = new RegExp("\\b"+clsName+"\\b", 'g');
		if(re.test(arr[i].className)){
			result.push(arr[i]);
		}
	}
	return result;
}

function getByTag(tagName, context){
	context = context || document;
	return context.getElementsByTagName(tagName);
}

function attr(elem, name, value) {
    if ( !name || name.constructor != String ) 
        return '';
    name = { 'for': 'htmlFor', 'class': 'className' }[name] || name;
    if ( value != null ) {
        elem[name] = value;
        if ( elem.setAttribute )
            elem.setAttribute(name,value);
    }
    return elem[name] || elem.getAttribute(name) || '';
}

function getStyle( elem, name ) {
    if (elem.style[name])
        return elem.style[name];
    else if (elem.currentStyle)
        return elem.currentStyle[name];
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        name = name.replace(/([A-Z])/g,"-$1");
        name = name.toLowerCase();
        var s = document.defaultView.getComputedStyle(elem,"");
        return s && s.getPropertyValue(name);
    } else
        return null;
}

function setCss(elem, attr, value){
    switch(attr){
        case 'width':
        case 'height':
        case 'padding':
        case 'paddingLeft':
        case 'paddingRight':
        case 'paddingTop':
        case 'paddingBottom':
            value = /\%/.test(value)?value:Math.max(parseInt(value), 0) + 'px';
            break;
        case 'left':
        case 'top':
        case 'bottom':
        case 'right':
        case 'margin':
        case 'marginLeft':
        case 'marginRight':
        case 'marginTop':
        case 'marginBottom':
            value = /\%/.test(value)?value:parseInt(value) + 'px';
            break;
    }
    elem.style[attr] = value;
}

function css(elem, attr, value){
	if(value){
		setCss(elem, attr, value);
	}else{
		if(typeof attr == 'string'){
			return getStyle(elem, attr);
		}else{
			var obj = attr;
			for(var p in obj){
				setCss(elem, p, obj[p])
			}
		}
	}
}

function addClass(elem, className){
	var re = new RegExp('\\b' + className + '\\b', 'g');
	if(!re.test(elem.className)){
		elem.className += " " + className;
	}
}

function removeClass(elem, className){
	var re = new RegExp('\\b' + className + '\\b', 'g');
	if(re.test(elem.className)){
		elem.className = trim(elem.className.replace(re, ""));
	}
}

function trim(str){
	return str.replace(/^\s+|\s+$/g, "");
}

function getHeight( elem ) {
    return parseInt( getStyle( elem, 'height' ) );
}

function getWidth( elem ) {
    return parseInt( getStyle( elem, 'width') );
}

function windowHeight() {
    var de = document.documentElement;
    return self.innerHeight || ( de && de.clientHeight ) || document.body.clientHeight;
}

function windowWidth() {
    var de = document.documentElement;
    return self.innerWidth || ( de && de.clientWidth ) || document.body.clientWidth;
}

function pageHeight() {
    return document.body.scrollHeight;
}

function pageWidth() {
    return document.body.scrollWidth;
}

function fullHeight( elem ) {
    if ( getStyle( elem, 'display' ) != 'none' )
        return elem.offsetHeight || getHeight( elem );
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    var h = elem.clientHeight || getHeight( elem );
    restoreCSS( elem, old );
    return h;
}

function fullWidth( elem ) {
    if ( getStyle( elem, 'display' ) != 'none' )
        return elem.offsetWidth || getWidth( elem );
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    var w = elem.clientWidth || getWidth( elem );
    restoreCSS( elem, old );
    return w;
}

function resetCSS( elem, prop ) {
    var old = {};
    for ( var i in prop ) {
        old[ i ] = elem.style[ i ];
        elem.style[ i ] = prop[i];
    }
    return old;
}

function restoreCSS( elem, prop ) {
    for ( var i in prop )
        elem.style[ i ] = prop[ i ];
}

function pageX(elem) {
    var p = 0;
    while ( elem.offsetParent ) {
        p += elem.offsetLeft;
        elem = elem.offsetParent;
    }

    return p;
}

function pageY(elem) {
    var p = 0;
    while ( elem.offsetParent ) {
        p += elem.offsetTop;
        elem = elem.offsetParent;
    }

    return p;
}

function posX(elem) {
    return parseInt( getStyle( elem, "left" ) );
}

function posY(elem) {
    return parseInt( getStyle( elem, "top" ) );
}

function parentX(elem) {
    return elem.parentNode == elem.offsetParent ?
        elem.offsetLeft : pageX( elem ) - pageX( elem.parentNode );
}

function parentY(elem) {
    return elem.parentNode == elem.offsetParent ?
        elem.offsetTop : ( elem ) - pageY( elem.parentNode );
}

function getX(e) {
    e = e || window.event;
    return e.pageX || e.clientX + document.body.scrollLeft || 0;
}

function getY(e) {
    e = e || window.event;
    return e.pageY || e.clientY + document.body.scrollTop || 0;
}

function addX(elem,pos) {
    setX( posX(elem) + pos );
}

function addY(elem,pos) {
    setY( posY(elem) + pos );
}

function scrollX() {
    var de = document.documentElement;
    return self.pageXOffset || ( de && de.scrollLeft ) || document.body.scrollLeft;
}

function scrollY() {
    var de = document.documentElement;
    return self.pageYOffset || ( de && de.scrollTop ) || document.body.scrollTop;
}

function getElementX( e ) {
    return ( e && e.layerX ) || window.event.offsetX;
}

function getElementY( e ) {
    return ( e && e.layerY ) || window.event.offsetY;
}

function append( parent, elem ) {
    var elems = checkElem( elem );
    for ( var i = 0; i < elems.length; i++ ) {
        parent.appendChild( elems[i] );
    }
}

function checkElem(a) {
    var r = [];
    if ( a.constructor != Array ) a = [ a ];

    for ( var i = 0; i < a.length; i++ ) {
        if ( a[i].constructor == String ) {
            var div = document.createElement("div");
            div.innerHTML = "<div><h1>hehehe</h1></div>";
             for ( var j = 0; j < div.childNodes.length; j++ ){
                 r[r.length] = div.childNodes[j];
             }
        } else if ( a[i].length ) { 
            for ( var j = 0; j < a[i].length; j++ )
                r[r.length] = a[i][j];
        } else { 
            r[r.length] = a[i];
        }
    }
    return r;
}

function before( parent, before, elem ) {
    if ( elem == null ) {
        elem = before;
        before = parent;
        parent  = before.parentNode;
    }
    parent.insertBefore( checkElem( elem ), before );
}

function addEvent(elem, type, handler){
    if(elem.addEventListener){
        elem.addEventListener(type, handler, false);
    }else if(elem.attachEvent){
        elem[type+handler] = function(){
            handler.call(elem);
        };
        elem.attachEvent('on'+type, elem[type+handler]);
    }else{
        elem['on'+type] = handler;
    }
}

function removeEvent(elem, type, handler){
    if(elem.removeEventListener){
        elem.removeEventListener(type, handler, false);
    }else if(elem.detachEvent){
        elem.detachEvent('on'+type, elem[type+handler]);
    }else{
        elem['on'+type] = null;
    }
}

function hide(elem, duration){
    if(duration){
        var currWidth = parseInt(getStyle(elem, 'width'));
        var currHeight = parseInt(getStyle(elem, 'height'));
        var currOpacity = getStyle(elem, 'opacity');

        var speedWidth = (currWidth / duration) * 30;
        var speedHeight = (currHeight / duration) * 30;
        var speedOpacity = (currOpacity / duration) * 30;

        var timer = setInterval(function(){
            currWidth -= speedWidth;
            elem.style.width = currWidth + 'px';

            currHeight -= speedHeight;
            elem.style.height = currHeight + 'px';

            currOpacity -= speedOpacity;
            elem.style.opacity = currOpacity;
            elem.style.filter = 'alpha(opacity: '+currOpacity*100+')';

            if(currWidth <= 0 || currHeight<=0 || currOpacity<=0){
                clearInterval(timer);
                elem.style.display = 'none';
            }
        }, 30);
    }else{  
        elem.style.display = 'none';
    }
}

function show(elem, duration){
    if(duration){

    }else{
        elem.style.display = 'block';
    }
}

function toggle(elem, duration){
    var curDisplay = getStyle( elem, 'display' );

    if ( curDisplay == 'none' ){
        show(elem, duration);
    }else{
        hide(elem, duration)
    }
}

function animate(elem, attr, callback){
    clearInterval(elem.timer);
    elem.timer = setInterval(function(){
        var bStop = true;
        for(var prop in attr){
            var currentStyle;

            if(prop == 'opacity'){
                currentStyle = parseInt(getStyle(elem, prop)*100);
            }else{
                currentStyle = parseInt(getStyle(elem, prop));
            }

            var speed = (attr[prop] - currentStyle) / 8;
            speed = speed < 0 ? Math.floor(speed) : Math.ceil(speed);


            if(currentStyle != attr[prop]){
                bStop = false;
            }

            currentStyle += speed;
            if(prop == 'opacity'){
                elem.style.opacity = currentStyle / 100;
                elem.style.filter = "alpha(opacity:"+currentStyle+")";
            }else{
                elem.style[prop] = currentStyle + 'px';
            }
        }

        if(bStop){
            clearInterval(elem.timer);
            if(callback) callback();
        }
    }, 30);
}
