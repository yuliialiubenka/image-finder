import { useStyles } from './emptyGalleryStyles';
import Image from "../../images/cloud-storage.png"

const EmptyGallery = () => {
    const classes = useStyles();       
    return (
        <div className={classes.wrapper}>
            <img className={classes.image} src={Image} alt="Empty block" width={300} />
            <p className={classes.text}>Image gallery is empty...</p>
        </div>
    );
}

export default EmptyGallery;