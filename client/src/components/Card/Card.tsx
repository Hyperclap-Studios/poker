import styles from './Card.module.scss';
import { GiClubs, GiDiamonds, GiHearts, GiSpades } from 'react-icons/gi';

export default function Card({rank, suit}: CardProps) {

    const Suit = () => {
        switch (suit) {
            case 'Clubs':
                return <GiClubs />;
            case 'Diamonds':
                return <GiDiamonds />;
            case 'Hearts':
                return <GiHearts />;
            case 'Spades':
                return <GiSpades />;
            default:
                return null;
        }
    };

    const getColor = () => {
        switch (suit) {
            case 'Clubs':
            case 'Spades':
                return 'black';
            case 'Diamonds':
            case 'Hearts':
                return 'red';
            default:
                return 'black';
        }
    };

    return (
        <div className={styles.card + ' ' + styles[getColor()]}>
            <span className={styles.suitTop}>
                {rank}
                <Suit />
            </span>
            <span className={styles.rank}><Suit /></span>
            <span className={styles.suitBottom}>
                {rank}
                <Suit />
            </span>
        </div>
    );
}