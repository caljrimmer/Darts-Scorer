define(['Registry'], function(Registry){
               
	var Lang = {
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
					StartNewGameTx : 'Start New Game',
					EnterScoreTx : 'Enter Score',
					AverageTx : 'Ave',
					NumberofDartsTx : 'Num'
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
		}   
	}   
	
	return Lang[Registry.lang];

});