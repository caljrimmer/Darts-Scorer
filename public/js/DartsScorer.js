define([
  'jquery',
  'underscore',
  'backbone'
], function($, _, Backbone){


	var DartsScorer = {

		scoreParse : function(score){

			if(score.search(/T/) > 0 || score.slice(0,1) == "T"){
			    //Calculates Trebles
				return parseInt(score.replace("T",""))*3;
			}else if(score.search(/t/) > 0 || score.slice(0,1) == "t"){
				//Calculates Trebles
				return parseInt(score.replace("t",""))*3;
			}else if(score.search(/D/) > 0 || score.slice(0,1) == "D"){
				//Calculates Doubles
				return parseInt(score.replace("D",""))*2;
			}else if(score.search(/d/) > 0 || score.slice(0,1) == "d"){
				//Calculates Doubles
				return parseInt(score.replace("d",""))*2; 
			}else{
				//Returns Singles
				return parseInt(score);
			}   

		},

		scoreSanitise : function(score){ 
			if(score.search(/T/) > 0 || score.slice(0,1) == "T"){
			    //Calculates Trebles
				return "T"+score.replace("T","");
			}else if(score.search(/t/) > 0 || score.slice(0,1) == "t"){
				//Calculates Trebles
				return "T"+score.replace("t","");
			}else if(score.search(/D/) > 0 || score.slice(0,1) == "D"){
				//Calculates Doubles
				return "D"+score.replace("D","");
			}else if(score.search(/d/) > 0 || score.slice(0,1) == "d"){
				//Calculates Doubles
				return "D"+score.replace("d",""); 
			}else{
				//Returns Singles
				return score;
			}
		},

		scoreValidate : function(score){ 

			//Validates 0 through 20, 1D to 20D (D1 to D20), 1T to 20T (T1 to T20), 25 and 50.
			if(score.match(/^[0-9]$|^[0-1][0-9]$|^[2][0]$|^[1-9]{1}[DdTt]$|^[0-1][0-9]{1}[DdTt]$|^[2][0]{1}[DdTt]$|^25$|^50$|^[DdTt][0-1][0-9]$|^[DdTt][1-9]$|^[DdTt][2][0]$/)){
				return true;
			}else{
				return false;
			} 

		},

		doublesValidate : function(score){
			//Validates 1D to 20D (D1 to D20) and 50.
	    if(score.match(/[1-9]{1}[Dd]|[0-1][0-9]{1}[Dd]|[2][0]{1}[Dd]|^50$|^[Dd][0-1][0-9]$|^[Dd][1-9]$|^[Dd][2][0]$/)){
				return true;
			}else{
				return false;
			}
		},

		treblesValidate : function(score){
			//Validates 1T to 20T (T1 to T20).
			if(score.match(/[1-9]{1}[Tt]|[0-1][0-9]{1}[Tt]|[2][0]{1}[Tt]|^[Tt][0-1][0-9]$|^[Tt][1-9]$|^[Tt][2][0]$/)){
				return true;
			}else{
				return false;
			}	
		},

		greenEyeAch : function(darts,total){
			//validates true if 75 or more is scored with just bulls and greeneye
			if(darts[0].desc === "25" || darts[0].desc === "50"){
				if(darts[1].desc === "25" || darts[1].desc === "50"){
					if(total >= 75){
						return true
					}
					if(darts[2].desc === "25" || darts[2].desc === "50"){
						return true
					}
				}
			}
		    return false;
		},

		bullsEyeAch : function(darts){
			if(darts[0].desc == "50" && darts[1].desc =="50" && darts[2].desc == "50"){
				return true;
			}else{
				return false;
			}
		},

		singlesAch : function(darts){ 
			if( !this.doublesValidate(darts[0].desc) 
				&& !this.doublesValidate(darts[1].desc) 
				&& !this.doublesValidate(darts[2].desc)
				&& !this.treblesValidate(darts[0].desc) 
				&& !this.treblesValidate(darts[1].desc) 
				&& !this.treblesValidate(darts[2].desc)){

				if(darts[0].desc == darts[1].desc && darts[1].desc == darts[2].desc){
					return true;
				} 
			}
			return false;
		},

		doublesAch : function(darts){
			if(this.doublesValidate(darts[0].desc) && this.doublesValidate(darts[1].desc) && this.doublesValidate(darts[2].desc)){
				if(darts[0].desc == darts[1].desc && darts[1].desc == darts[2].desc){
					return true;
				}
			}
		   return false;
		},

		treblesAch : function(darts){
			if(this.treblesValidate(darts[0].desc) && this.treblesValidate(darts[1].desc) && this.treblesValidate(darts[2].desc)){
				if(darts[0].desc == darts[1].desc && darts[1].desc == darts[2].desc){
					return true;
				}
			}
		   return false;
		},

		shanghaiAch : function(darts,score){
			//shanghai will always be the modulus of 6
			var concat = darts[0].desc+darts[1].desc+darts[2].desc;
			if(score % 6 == 0){
				if(concat.indexOf('T')!== -1 && concat.indexOf('D') !== -1){
					darts[0].desc = darts[0].desc.replace("T","");
					darts[0].desc = darts[0].desc.replace("D","");
					darts[1].desc = darts[1].desc.replace("T","");
					darts[1].desc = darts[1].desc.replace("D","");
					darts[2].desc = darts[2].desc.replace("T","");
					darts[2].desc = darts[2].desc.replace("D","");
					if(darts[0].desc == darts[1].desc && darts[1].desc == darts[2].desc ){
						return true;
					}
				}
			}
			return false;
		},
		
		oneEightyAch : function(score){
			if(score === 180){
				return true       
			}
			return false;
		},
		
		oneFortyAch : function(score){
			if(score > 139 && score < 180){
				return true       
			}
			return false;
		},
		
		oneTwentyAch : function(score){
			if(score > 119 && score < 140){
				return true       
			}
			return false;
		},
		
		oneHundredAch : function(score){
			if(score > 99 && score < 120){
				return true       
			}
			return false;
		},

		checkoutCalculation : function(total){
			var total = parseInt(total);
			switch(total)
			        {
				case 170: return 'T20 T20 50'; break;
				case 167: return 'T20 T19 50'; break;
				case 164: return 'T19 T19 50'; break;
				case 161: return 'T20 T17 50'; break;
				case 160: return 'T20 T20 D20'; break;
				case 158: return 'T20 T20 D19'; break;
				case 157: return 'T19 T20 D20'; break;
				case 156: return 'T20 T20 D16'; break;
				case 155: return 'T20 T19 D19'; break;
				case 154: return 'T20 T18 D20'; break;
				case 153: return 'T20 T19 D18'; break;
				case 152: return 'T20 T20 D16'; break;
				case 151: return 'T20 T17 D20'; break;
				case 150: return 'T20 T18 D18'; break;
				case 149: return 'T20 T19 D16'; break;
				case 148: return 'T20 T20 D14'; break;
				case 147: return 'T20 T17 D18'; break;
				case 146: return 'T20 T18 D16'; break;
				case 145: return 'T20 T15 D20'; break;
				case 144: return 'T20 T20 D12'; break;
				case 143: return 'T20 T17 D16'; break;
				case 142: return 'T20 T14 D20'; break;		
				case 141: return 'T20 T15 D18'; break;
				case 140: return 'T20 T16 D16'; break;
				case 139: return 'T20 T13 D20'; break;
				case 138: return 'T20 T14 D18'; break;
				case 137: return 'T20 T15 D16'; break;
				case 136: return 'T20 T20 D8'; break;
				case 135: return 'T20 T13 D18'; break;
				case 134: return 'T20 T14 D16'; break;
				case 133: return 'T20 T19 D8'; break;
				case 132: return 'T20 T16 D12'; break;
				case 131: return 'T20 T13 D16'; break;
				case 130: return 'T20 T18 D8'; break;
				case 129: return 'T19 T16 D12'; break;
				case 128: return 'T20 T20 D4'; break;
				case 127: return 'T20 T17 D8'; break;
				case 126: return 'T19 19 50'; break;
				case 125: return 'T20 T19 D4'; break;
				case 124: return 'T20 T16 D8'; break;
				case 123: return 'T20 T13 D12'; break;
				case 122: return 'T18 18 50'; break;
				case 121: return '25 T20 D18'; break;		
				case 120: return 'T20 20 D20'; break;
				case 119: return '19 T20 D20'; break;
			    case 118: return 'T20 18 D20'; break;
				case 117: return 'T20 17 D20'; break;
				case 116: return 'T20 16 D20'; break;
				case 115: return '19 T20 D18'; break;
				case 114: return 'T20 14 D20'; break;
				case 113: return 'T20 13 D20'; break;
				case 112: return 'T20 12 D20'; break;
				case 111: return 'T20 19 D16'; break;
				case 110: return 'T20 10 D20'; break;
				case 109: return 'T20 17 D16'; break;
				case 108: return 'T19 19 D16'; break;
				case 107: return 'T19 10 D20'; break;
				case 106: return 'T20 10 D18'; break;
				case 105: return 'T20 13 D16'; break;
				case 104: return 'T20 12 D16'; break;
				case 103: return 'T19 10 D18'; break;
				case 102: return 'T20 10 D16'; break;
				case 101: return 'T17 10 D20'; break;
				case 99: return 'T19 10 D16'; break;
				case 98: return 'T20 D19'; break;
				case 97: return 'T19 D20'; break;
				case 96: return 'T20 D18'; break;
				case 95: return 'T19 D19'; break;
				case 94: return '18 D20'; break;
				case 93: return 'T19 D18'; break;
				case 92: return 'T20 D16'; break;
				case 91: return 'T17 D20'; break;
				case 90: return 'T18 D18'; break;
				case 89: return 'T19 D16'; break;
				case 88: return 'T20 D14'; break;
				case 87: return 'T17 D18'; break;
				case 86: return 'T18 D16'; break;
				case 85: return 'T15 D20'; break;
				case 84: return 'T20 D12'; break;
				case 83: return 'T17 D16'; break;
				case 82: return 'T14 D20'; break;
				case 81: return 'T19 D12'; break;
				case 80: return 'T20 D10'; break;
				case 79: return 'T13 D20'; break;
				case 78: return 'T18 D12'; break;
				case 77: return 'T19 D10'; break;
				case 76: return 'T20 D8'; break;
				case 75: return 'T15 D15'; break;
				case 74: return 'T18 D10'; break;
				case 73: return 'T19 D8'; break;
				case 72: return 'T20 D6'; break;
				case 71: return 'T13 D16'; break;
				case 70: return 'T10 D20'; break;
				case 69: return 'T11 D18'; break;
				case 68: return 'T20 D4'; break;
				case 67: return 'T17 D8'; break;
				case 66: return 'T18 D6'; break;
				case 65: return 'T19 D4'; break;
				case 64: return 'T16 D8'; break;
				case 63: return 'T13 D12'; break;
				case 62: return 'T10 D16'; break;
				case 61: return 'T15 D8'; break;
				case 60: return '20 D20'; break;
				case 59: return '19 D20'; break;
				case 58: return '18 D20'; break;
				case 57: return '17 D20'; break;
				case 56: return '16 D20'; break;
				case 55: return '15 D20'; break;
				case 54: return '14 D20'; break;
				case 53: return '13 D20'; break;
				case 52: return '12 D20'; break;
				case 51: return '11 D20'; break;
				case 50: return '10 D20'; break;
				case 49: return '9 D20'; break;
				case 48: return '8 D20'; break;
				case 47: return '15 D16'; break;
				case 46: return '14 D16'; break;
				case 45: return '13 D16'; break;
				case 44: return '12 D16'; break;
				case 43: return '11 D16'; break;
				case 42: return '10 D16'; break;
				case 41: return '9 D16'; break;
				case 40: return 'D20'; break;
				case 39: return '7 D16'; break;
				case 38: return 'D19'; break;
				case 37: return '5 D16'; break;
				case 36: return 'D18'; break;
				case 35: return '3 D16'; break;
				case 34: return 'D17'; break;
				case 33: return '1 D16'; break;
				case 32: return 'D16'; break;
				case 31: return '15 D8'; break;
				case 30: return 'D15'; break;
				case 29: return '13 D8'; break;
				case 28: return 'D14'; break;
				case 27: return '11 D8'; break;
				case 26: return 'D13'; break;
				case 25: return '9 D18'; break;
				case 24: return 'D12'; break;
				case 23: return '7 D8'; break;
				case 22: return 'D11'; break;
				case 21: return '5 D8'; break;
				case 20: return 'D10'; break;
				case 19: return '3 D8'; break;
				case 18: return 'D9'; break;
				case 17: return '1 D8'; break;
				case 16: return 'D8'; break;
				case 15: return '7 D4'; break;
				case 14: return 'D7'; break;
				case 13: return '5 D4'; break;
				case 12: return 'D6'; break;
				case 11: return '3 D4'; break;
				case 10: return 'D5'; break;
				case 9: return '1 D4'; break;
				case 8: return 'D4'; break;
				case 7: return '3 D2'; break;
				case 6: return 'D3 '; break;
				case 5: return '1 D2'; break;
				case 4: return 'D2'; break;
				case 3: return '1 D1'; break;
				case 2: return 'D1'; break;
				default: return '- - -';
			} 
		}

	}
	
	return DartsScorer;

});


