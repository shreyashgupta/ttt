let Players=['X','O'];
let turn;
let cells=[[],[],[]];
let ind=[];
let btn;
let p2;
let winner,tie;
let banner;
function setup() {
  rectMode(CENTER);
  let cnv=createCanvas(windowWidth/4, windowWidth/4);
  cnv.position(window.innerWidth/2-width/2,window.innerHeight/2-height/2);
  background(0);
  drawBoard();
  btn=createButton("RESET");
  btn.mousePressed(reset);
  btn.position(windowWidth/2-25,windowHeight/2+width/2+20);
  for(let i=1;i<=3;i++)
    for(let j=1;j<=3;j++)
  {
    cells[i-1][j-1]=new Cell(i,j);
  }
  turn=floor(random(2));
  p2=createElement('h1',"");
  banner=createElement('h1',"");
}

function draw() {
  winner=checkWinner();
  tie=checkTie();
  if(winner)
  {
    won();
    noLoop();
  }
  else if(tie)
  {
    for(let i=0;i<3;i++)
      for(let j=0;j<3;j++)
        cells[i][j].tie();
      tied();
    noLoop();
  }
}
function mousePressed()
{
  if(!winner)
  {
  var w=width/3;
  var h=height/3;
  checkWithin();
  var i=ind[0];
  var j=ind[1];
  if(cells[i][j].item==null)
  {
    cells[i][j].takeTurn();
  }
  }
}
function checkWithin()
{
  var w=width/3;
  var h=height/3;
  for(let i=0;i<3;i++)
    for(let j=0;j<3;j++)
  {
    if(mouseX>(cells[i][j].x-w/2) &&
        mouseX<(cells[i][j].x+w/2) &&
          mouseY>(cells[i][j].y-w/2) && mouseY<(cells[i][j].y+w/2))
    {
     ind[0]=i;
      ind[1]=j;
      return;
    }
  }  
}
function drawBoard()
{
  let w=width/3;
  let h=height/3;
  for(let i=1;i<3;i++)
  {
    stroke(150);
    strokeWeight(2);
    line(i*w,0,i*w,height);
    line(0,i*w,width,i*w);
  }
}
class Cell{
  constructor(i,j)
  {
    this.col=color(0);
    this.x=width/3*(i-1/2);
    this.y=height/3*(j-1/2);
    this.item=null;
  }
  display()
  {
    ellipse(this.x,this.y,20,20);
  }
  takeTurn()
  {
    var w=width/3;
    var h=height/3;
    if(turn==0)
    {
      stroke(255);
      strokeWeight(4);
      line(this.x-w/4,this.y-w/4,this.x+w/4,this.y+w/4);
      line(this.x+w/4,this.y-w/4,this.x-w/4,this.y+w/4);
    }
    else
    {
      stroke(255);
      strokeWeight(4);
      noFill();
      ellipse(this.x,this.y,w/2,w/2);
    }
    this.item=turn;
    turn=(turn+1)%2;
  }
  won()
  {
    fill('rgba(0,255,0,0.5)');
    noStroke();
    rect(this.x,this.y,width/3,height/3);
  }
  tie()
  {
    fill('rgba(255,0,0,.5)');
    noStroke();
    rect(this.x,this.y,width/3,height/3);
  }
}
function checkWinner()
{
for(let i=0;i<3;i++)
{
  if(cells[i][0].item==cells[i][1].item &&
       cells[i][2].item==cells[i][1].item &&
         cells[i][0].item!=null)
  {
    ind[0]=i;
    ind[1]=0;
    cells[i][0].won();
    cells[i][1].won();
    cells[i][2].won();
    return true;
  }
}
for(let i=0;i<3;i++)
{
  if(cells[0][i].item==cells[1][i].item &&
       cells[2][i].item==cells[1][i].item &&
         cells[0][i].item!=null)
  {
    cells[0][i].won();
    cells[1][i].won();
    cells[2][i].won();
    ind[0]=0;
    ind[1]=i;
    return true;
  }
}
  if(cells[0][0].item==cells[1][1].item &&
      cells[1][1].item==cells[2][2].item &&
       cells[0][0].item!=null)
  {
    cells[0][0].won();
    cells[1][1].won();
    cells[2][2].won();
    ind[0]=0;
    ind[1]=0;
    return true;
  }
    if(cells[2][0].item==cells[1][1].item && 
       cells[1][1].item==cells[0][2].item &&
         cells[2][0].item!=null)
  {
    cells[2][0].won();
    cells[1][1].won();
    cells[0][2].won();
    ind[0]=0;
    ind[1]=2;
    return true;
  }
}
function checkTie()
{
  for(let i=0;i<3;i++)
  {
    for(let j=0;j<3;j++)
    {
      if(cells[i][j].item==null)
        return false;
    }
  }
  return true;
}
function won()
{
  banner.html("Winner is " + Players[cells[ind[0]][ind[1]].item]);
  banner.style('text-align','center');
  p2.style('font-size','35');
  banner.style('color','#413EF9');
  banner.style('margin-bottom','15px');
}
function tied()
{
  p2.html("Its a Tie");
  p2.style('text-align','center');
  p2.style('font-size','35');
  p2.style('color','#DB3434');
  p2.style('margin-bottom','25px');
}
function reset()
{
  cells=[[],[],[]];
  for(let i=1;i<=3;i++)
    for(let j=1;j<=3;j++)
  {
    cells[i-1][j-1]=new Cell(i,j);
  }
  turn=floor(random(2));
  background(0);
  drawBoard();
  banner.html("");
  p2.html("");
  loop();
}