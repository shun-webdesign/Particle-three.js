uniform float amount;
uniform sample2D tDiffuse;
varying vec2 vUv;

float random(vec2 p){
  vec2 K1=vec2(
    23.14069263277926,// e^pi (Gelfond's constant)
    2.665144142690225// 2^sqrt(2) (Gelfondâ€“Schneider constant)
  );
  return fract(cos(dot(p,K1))*12345.6789);
}

void main(){
  vec4 color=texture2D(tDiffuse,vUv);
  vec2 uvRandom=vUv;
  uvRandom.y*=random(vec2(uvRandom.y,amount));
  color.rgb+=random(uvRandom)*.15;
  gl_FragColor=vec4(color);
}
