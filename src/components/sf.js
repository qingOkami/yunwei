var sl;

function shuliang (n)

{

  if(n==6)

  {

    sl=1;

  }

  else{

    sl=(shuliang(n+1)+1)*2;

  }
return sl
  console.log(sl,22);

}

console.log(shuliang(0));
