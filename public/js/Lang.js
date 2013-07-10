define(['Registry'], function(Registry){
               
	var Lang = {
		setLang : function(lang){
			localStorage.lang = lang;
			Registry.lang = lang;
		},
		getLang : function(){
			return this[Registry.lang]
		},
		en : {
			Navigation : {
				DashboardTx : 'Dashboard',
				ScoreAGameTx: 'Score a Game',
				StatsTx : 'Stats'
			},
			Template : {
				HistoryTable : {
					WhenTx : 'When',
					AchievementTx : 'Achievement',
					AchievementsTx : 'Achievements',
					AveTx : 'Ave',
					NotScoredYetTx : 'No games have been scored yet'
				},
				AchievementsTable : {
					LabelTx : 'Label',
					AchievementsTx : 'Achievements',
					GroupingTx : 'Grouping',
					BullsTx : 'Bulls',
					GreenEyeTx : 'GreenEye',
					BullsEyeTx : 'BullEye',
					SinglesTx : 'Singles',
					DoublesTx : 'Doubles',
					TreblesTx : 'Trebles',
					DartersTx : 'Darters',
					CheckoutTx : 'Checkout',
					SpecialsTx : 'Specials',
					ShanghaiTx : 'Shanghai'
				},
				Records : {
					NumberOfGamesTx : 'No. of Games',
					HighestDartsTx : 'Highest 3 Darts',
					HighestCheckoutTx : 'Highest Checkout',
					AverageDartsTx : 'Ave. per 3 Darts (last 30)',
					LeastThrowsTx : 'Least Throws',
					BestAverageTx : 'Best Average'
				},
				Scorer : {
					GraphicTx : 'Graphic View',
					KeyboardTx : 'Keyboard View',
					StartNewGameTx : 'Start New Game',
					EnterScoreTx : 'Enter Score',
					AverageTx : 'Ave',
					NumberofDartsTx : 'Num',
					StartTx : 'Start',
					FinishTx : 'Finish',
					DurationTx : 'Duration', 
					SecsTx : 'secs'
				}
			},
			TimeAgo : {
		        prefixAgo: null,
		        prefixFromNow: null,
		        suffixAgo: "",
		        suffixFromNow: "from now",
		        seconds: "a min",
		        minute: "a min",
		        minutes: "%d mins",
		        hour: "an hour",
		        hours: "%d hours",
		        day: "a day",
		        days: "%d days",
		        month: "a month",
		        months: "%d months",
		        year: "a year",
		        years: "%d years",
		        wordSeparator: " ",
		        numbers: []
			}
		},
		nl : {
			Navigation : {
				DashboardTx : 'Dashboard',
				ScoreAGameTx: 'Scoren een spel',
				StatsTx : 'Stats'
			},
			Template : {
				HistoryTable : {
					WhenTx : 'Wanneer',
					AchievementTx : 'Prestatie',
					AchievementsTx : 'Prestaties',
					AveTx : 'Gemi.',
					NotScoredYetTx : 'Een spelletjes zijn nog gescoord'
				},
				AchievementsTable : {
					LabelTx : 'Label',
					AchievementsTx : 'Prestaties',
					GroupingTx : 'Groepering',
					BullsTx : 'Bulls',
					GreenEyeTx : 'GreenEye',
					BullsEyeTx : 'BullEye',
					SinglesTx : 'Singles',
					DoublesTx : 'Dubbelspel',
					TreblesTx : 'Hoge tonen',
					DartersTx : 'Darters',
					CheckoutTx : 'Uitchecken',
					SpecialsTx : 'Specials',
					ShanghaiTx : 'Shanghai'
				},
				Records : {
					NumberOfGamesTx : 'Aantal spellen',
					HighestDartsTx : 'Hoogtse 3 darts',
					HighestCheckoutTx : 'Hoogtse Uitchecken',
					AverageDartsTx : 'Gemi. (laatste 30)',
					LeastThrowsTx : 'Minste worpen',
					BestAverageTx : 'Beste gemi.'
				},
				Scorer : { 
					GraphicTx : 'Graphic View',
					KeyboardTx : 'Keyboard View',
					StartNewGameTx : 'Starten nieuw spel',
					EnterScoreTx : 'Vore score',
					AverageTx : 'Gemi',
					NumberofDartsTx : 'Aan',
					StartTx : 'Beginnen',
					FinishTx : 'Afmaken',
					DurationTx : 'Duur', 
					SecsTx : 'secs'
				}
			},
			TimeAgo : {
		        prefixAgo: null,
		        prefixFromNow: null,
		        suffixAgo: "",
		        suffixFromNow: "van nboe",
		        seconds: "min",
		        minute: "min",
		        minutes: "%d mins",
		        hour: "uur",
		        hours: "%d urr",
		        day: "dag",
		        days: "%d dagen",
		        month: "a maand",
		        months: "%d maanden",
		        year: "jaar",
		        years: "%d jaar",
		        wordSeparator: " ",
		        numbers: []
			}	
		},
		es : {
			Navigation : {
				DashboardTx : 'Salpicadero',
				ScoreAGameTx: 'Puntuación de un juego',
				StatsTx : 'Estadística'
			},
			Template : {
				HistoryTable : {
					WhenTx : 'Cuando',
					AchievementTx : 'Logro',
					AchievementsTx : 'Logros',
					AveTx : 'Prom.',
					NotScoredYetTx : 'No hay juegos que han anotado aún'
				},
				AchievementsTable : {
					LabelTx : 'Etiqueta',
					AchievementsTx : 'Logros',
					GroupingTx : 'Agrupamiento',
					BullsTx : 'Bulls',
					GreenEyeTx : 'GreenEye',
					BullsEyeTx : 'BullEye',
					SinglesTx : 'Individual',
					DoublesTx : 'Dobles',
					TreblesTx : 'Triples',
					DartersTx : 'Darters',
					CheckoutTx : 'Caja',
					SpecialsTx : 'Especiales',
					ShanghaiTx : 'Shanghai'
				},
				Records : {
					NumberOfGamesTx : 'Núm. de juegos',
					HighestDartsTx : 'Más 3 Dardos',
					HighestCheckoutTx : 'Máyor caja',
					AverageDartsTx : 'Prom. (último 30)',
					LeastThrowsTx : 'Menos tiros',
					BestAverageTx : 'Mejor promedio'
				},
				Scorer : {
					GraphicTx : 'Graphic View',
					KeyboardTx : 'Keyboard View',
					StartNewGameTx : 'Iniciar un nevo juego',
					EnterScoreTx : 'Puntuación',
					AverageTx : 'Prom',
					NumberofDartsTx : 'Núm',
					StartTx : 'Iniciar',
					FinishTx : 'Terminar',
					DurationTx : 'Duracion', 
					SecsTx : 'segundo'
				}
			},
			TimeAgo : {
			   prefixAgo: "hace",
			   prefixFromNow: "dentro de",
			   suffixAgo: "",
			   suffixFromNow: "",
			   seconds: "menos de un minuto",
			   minute: "un minuto",
			   minutes: "unos %d minutos",
			   hour: "una hora",
			   hours: "%d horas",
			   day: "un día",
			   days: "%d días",
			   month: "un mes",
			   months: "%d meses",
			   year: "un año",
			   years: "%d años"
			}
		}   
	}   
	
	return Lang;

});