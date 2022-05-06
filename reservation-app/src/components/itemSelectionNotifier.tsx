import { useReservationContext } from "./reservationcontext";

  
const ItemSelectionNotifier: React.FunctionComponent = () => {

    const { item } = useReservationContext();
    let notifyuser: boolean = false;
    if(!item || item._id.length < 1){
        notifyuser = true;
    }

    return (<div className="itemselectionNotifier">
            {notifyuser ? <>
            <div className="arrow" id="arrow1"></div>
            <div className="arrow" id="arrow2"></div>
            <div className="arrow" id="arrow3"></div>
            <div className="notification">Choose Gear</div>
            <div className="arrow" id="arrow1"></div>
            <div className="arrow" id="arrow1"></div>
            <div className="arrow" id="arrow1"></div></>
                : <></> }
            </div>

    )};


export default ItemSelectionNotifier;