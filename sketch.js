//https://youtu.be/VcCcVm8Xb4c
var tela = 0,xMenu=50,yMenu=85,mLarg=200,mAlt=50,arrbord=33;
var yTxtMenu = 120,xTxtMenu =150, op=0,txtVoltar="Esc(Voltar)";
var img_prof,img_prog,vd,playTrilha = false,gameover = false;
var vBol = 3;
var xBol = 300,yBol = 200,diam = 15,raio = diam / 2 ,veloXBol = vBol,veloYBol = vBol,raq,pts,qtdCol=0;
var xJ1 = 5, yJ1 = 150,raqLarg = 10,raqAlt = 90,colidiu = false;
var ptsJ1 = 0,ptsJ2 = 0,xJ2 = 585, yJ2 = 150, veloYJ2,sobreOp = 0;
var s = 0, m = 0,cont = 0,rate = 30,t = 0,resp,indexTab=" ",fase = '',fnum=0;
var tab = {};
// Preencher com os resultados de multiplicação
for (let i = 1; i <= 10; i++) {
    for (let j = 1; j <= 10; j++) {
        tab[`${i}x${j}`] = i * j;
    }
}


function mostrarTxtVoltar(){
  noStroke();
  textAlign(LEFT);
  textSize(16);
  fill(240,240,240,180);
  text(txtVoltar, 15, 26);
  fill(255);
}
function menu(){
    respField.value('');
    respField.hide();
    resp = 'hide';
    cont = 0;
    s=0;
    m=0;
    textAlign(CENTER);
    textSize(26);
    stroke(200);
    text("PONG",300,50);
    fill(20);

    if(mouseX > xMenu && mouseY < yMenu + mLarg && mouseY > yMenu && mouseY < yMenu + mAlt){
        rect(xMenu,yMenu,mLarg,mAlt,arrbord); 
        sobreOp = 1;
         }
      else if(mouseX > xMenu && mouseY < yMenu + mLarg && mouseY > yMenu+65 && mouseY < yMenu+65 + mAlt){
        rect(xMenu,yMenu+65,mLarg,mAlt,arrbord);
        sobreOp = 2;
         }
      else if(mouseX > xMenu && mouseY < yMenu + mLarg && mouseY > yMenu+(65*2) && mouseY < yMenu+(65*2)  + mAlt){
        rect(xMenu,yMenu+(65*2),mLarg,mAlt,arrbord);
        sobreOp = 3;
       }else{
         sobreOp = 0;
       }
    
    fill(240);
    noStroke();
    text("Iniciar",xTxtMenu, yTxtMenu);
    text("Instruções",xTxtMenu, yTxtMenu+65);
    text("Créditos",xTxtMenu, yTxtMenu+(65*2));
}
function mouseClicked() {
      if(op==0){
        if(sobreOp == 1){
          op = 1;
          
        }else if(sobreOp == 2){
          op = 2;
        }else if(sobreOp == 3){
          op = 3;
        }
      }
}

function preload(){
  img_prof = loadImage('prof.png');
  img_prog = loadImage('prog.png');
  trilhaMenu = loadSound("loop-menu.ogg");
  trilha = loadSound("beat-loop.ogg");
  trilha.setVolume(0.2);
  pts = loadSound("click2.ogg");
  raq = loadSound("click.ogg");

}


function setup() {
  respField = createInput('', 'number')
  respField.attribute('placeholder', '')
  respField.position(250, 100)
  respField.size(75)
  respField.hide();
  
  frameRate(rate);
  s=0;
  m=0;
  createCanvas(600, 400);
  /*
  vd = createVideo("pong.mp4");
  vd.size(600, 400);
  vd.loop();
  vd.speed(1);
  vd.hide();
  vd.volume(0); 
  */
  trilhaMenu.loop();
}

function draw() {
if (keyIsDown(27)) {
      op = 0;
      gameover = false;
      ptsJ2 = 0;
      ptsJ1 = 0;
      xBol = 300;
      yBol = 200;
}

if(!gameover){
  if(op == 0){
    trilha.stop();
    if(playTrilha){
      trilhaMenu.loop();
    }
    playTrilha = false;
    //let img = vd.get();
    //image(img, 0, 0);
    background(0);
    s = 0;
    m = 0;
    menu();
  }else if(op == 1){
    trilhaMenu.stop();
    jogo(); 
  }else if(op == 2){
    info();         
  }else if(op == 3){
    creditos();        
  }

if (keyIsDown(27)) {
      op = 0;
}
  
}
  
}
function creditos(){
  background(0);
  mostrarTxtVoltar();
  textAlign(CENTER);
  textSize(26);
  text("Créditos", 300, 30);
  image(img_prog, 255, 50, 90, 90);
  textAlign(LEFT);
  textSize(16);
  text("FRANCISCO EVERALDO DA SILVA JUNIOR : Programador", 55, 165);
  image(img_prof, 255, 190, 90, 90);
  textAlign(LEFT);
  text("RUMMENIGGE RUDSON DANTAS : Educador", 55, 305);

}
function info(){
  background(0);
  mostrarTxtVoltar();
  textSize(26);
  textAlign(CENTER);
  text("Instruções", 300, 30);
  textAlign(LEFT);
  textSize(16);
  textSize(20)
  fill(240);
  text('O jogo consiste em duas raquetes retangulares e uma bola, a\n raquete da esquerda é controlada por "q"(cima) e  "a"(baixo),\n já a raquete da direita é controlada  pelos botões direcionais do\n teclado seta para cima ↑ e seta para baixo ↓ . O jogador deve\n impedir que a bola caia fora da sua raquete, caso ocorra seu\n adversário pontuará, já se o adversário deixar a bola cair fora\n da raquete, você pontuará, ganha quem fizer 3 pontos primeiro.', 10, 100);
  
}
function jogo(){
  if(veloXBol > 0){veloXBol = vBol;}else{veloXBol = -vBol;}
  if(veloYBol > 0){veloYBol = vBol;}else{veloYBol = -vBol;}

  if(respField.value() == tab[indexTab]){
    ptsJ1 = ptsJ1 + 5;
    respField.value('');
    respField.hide();
    resp = 'hide';
  }
  if(!playTrilha){
    trilha.loop();
  }
  playTrilha = true;
  background(0);
  mostrarTxtVoltar();
  mostraBol();
  movBol();
  verColBord();
  movJ1();
  verColRaq(xJ1, yJ1);
  mostraRaq(xJ1, yJ1);
  mostraRaq(xJ2, yJ2);
  movJ2Auto();
  //movJ2();
  verColRaq(xJ2, yJ2)
  marcaPt();
  incluiPlacar(); 
  
}

function mostraBol(){
  circle(xBol, yBol, diam);
}

function movBol(){
  xBol += veloXBol;
  yBol += veloYBol;
}

function verColBord(){
  if (xBol + raio> width ||
     xBol - raio< 0){
    veloXBol *= -1;
  }
  if (yBol + raio> height ||
     yBol - raio < 0){
    veloYBol *= -1;
  }
}
function mostraRaq(x,y){
rect (x, y, raqLarg, raqAlt)
}

function movJ2() {
    if (keyIsDown(UP_ARROW)) {
        yJ2 -= 10;
    }
    if (keyIsDown(DOWN_ARROW)) {
        yJ2 += 10;
    }
}

function movJ1() {
  if (keyIsDown(81)||keyIsDown(113)) {
        yJ1 -= 10;
  }
  if (keyIsDown(65)||keyIsDown(97)) {
        yJ1 += 10;
  }
}
function verColRaq(x, y) {
    colidiu = collideRectCircle(x, y, raqLarg, raqAlt, xBol, yBol, raio);
    if (colidiu) {
        veloXBol = veloXBol;
        veloXBol *= -1;
        raq.play();
        qtdCol++;
      //respField.value() != 7 && 
        if(resp != 'show' & respField.value() == '' && qtdCol%2 == 0){
          resp = 'show';
          // Exibir o objeto no console para verificação
          indexTab = fnum+'x'+Math.floor(Math.random() *10+1);
          //console.log(tab[indexTab]);
          respField.attribute('placeholder', indexTab)
          respField.show();

          respField.elt.focus();
        }
    }
  }
function  movJ2Auto(){
 veloYJ2 = yBol - yJ2 - raqLarg /2 -30;
  yJ2 += veloYJ2
  
}
function incluiPlacar(){
    //respField.focus();
    cont ++;
    if(m == 0 && s == 1){fase= 'Fase 1';fnum=1;vBol=4}else
    if(m == 0 && s == 15){fase= 'Fase 2';fnum=2;vBol=5}else
    if(m == 0 && s == 30){fase= 'Fase 3';fnum=3;vBol=6}else
    if(m == 0 && s == 45){fase= 'Fase 4';fnum=4;vBol=7}else
    if(m == 0 && s == 59){fase= 'Fase 5';fnum=5;vBol=7.5}else
    if(m == 1 && s == 1){fase= 'Fase 6';fnum=6;vBol=8}else
    if(m == 1 && s == 15){fase= 'Fase 7';fnum=7;vBol=9}else
    if(m == 1 && s == 30){fase= 'Fase 8';fnum=8;vBol=10}else
    if(m == 1 && s == 45){fase= 'Fase 9';fnum=9;vBol=11}else
    if(m == 1 && s == 59){fase= 'Fase 10';fnum=10;vBol=12}else{fase= '';}
    fill(255);
    textSize(26);
    textAlign(CENTER);
    text(fase, 300, 200);
    
  /*
    if(s!=parseInt(cont / rate)){
      //vBol=vBol+0.1; 
    }
  */
    s = parseInt(cont / rate);
    if(s >= 60){
      cont = 0;
      m++;
    }
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    m = ("00" + m).slice(-2);
    s = ("00" + s).slice(-2);
    t =m+':'+s;
    text(`${t}`,300,26);
    text('Pontos J1 : '+ptsJ1, 150, 26);
    fill(255);
    text('Pontos J2 : '+ptsJ2, 450, 26);
}
function marcaPt() {
    if (xBol > 591) {
        ptsJ1 += 5;
      pts.play()
    }
    if (xBol < 9) {
        ptsJ2 += 5;
        pts.play();
    }
  if(ptsJ1 >= 100){
    textSize(26);
    textAlign(CENTER);
    text("J1 Ganhou!", 300, 200);
    gameover = true;
    qtdCol = 0;
    trilha.stop();
    respField.value('');
    respField.hide();
    resp = 'hide';
    veloXBol = 3;
    veloYBol = 3;
  }
  if(ptsJ2 >= 100){
    textSize(26);
    textAlign(CENTER);
    text("J2 Ganhou!", 300, 200);
    gameover = true;
    trilha.stop();
        respField.value('');
    respField.hide();
    resp = 'hide';
    veloXBol = 3;
    veloYBol = 3;
  }
}
