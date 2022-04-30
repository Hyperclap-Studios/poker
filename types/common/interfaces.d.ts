interface Player {
    uuid: string;
    money: number;
    color: Color;
}

interface CardProps {
    rank: Rank;
    suit: Suit;
}