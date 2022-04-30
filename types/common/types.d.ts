type Color = string;

type Rank = 'A' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '10' | 'J' | 'Q' | 'K';

type Suit = 'Clubs' | 'Diamonds' | 'Hearts' | 'Spades';

type Role = 'Dealer' | 'Small Blind' | 'Big Blind' | 'Player';

type GameState = 'Waiting' | 'Pre-Flop' | 'Flop' | 'Turn' | 'River' | 'Showdown';