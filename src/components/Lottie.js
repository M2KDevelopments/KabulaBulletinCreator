import  { useLottie } from "lottie-react";
import * as lottieLoading from '../res/lottie_loading.json';
import React from "react";

function Lottie(props) {
  
  const options = {
    animationData: props.lottie.default,
    loop: true,
    autoplay: true,
  };
 
  const { View } = useLottie(options);
 
  return View;
}

export function LoadingAnimation(props){
  return <div className="centralise" style={{width:props.width, height:props.height}}>
          <Lottie lottie={lottieLoading} />
            <br/>
            <h6 className="colorPrimary">
              <strong>{props.title}</strong>
            </h6>
          </div>
}