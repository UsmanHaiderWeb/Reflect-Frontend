import SingleCollectionPage from "@/pages/SingleCollection"
import { Params, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { StoreType } from "@/ReduxStore/Store";
import { userDataType } from "@/ReduxStore/Slices/userData.slice";
import { collectionsInterface } from "@/data/types&Interfaces";
import CollectionLoading from "./CollectionLoading";

const SingleCollectionWrapper = () => {
    const { collectionId } = useParams<Params>();
    const userData = useSelector((state: StoreType) => state.userData) as userDataType;

    console.log("Collection: ", userData?.collections?.find((collection: collectionsInterface) => collection._id == collectionId))
    if (!userData?.email) {
        return (
            <CollectionLoading />
        )
    }

    return <SingleCollectionPage collectionData={userData.collections.find((collection: collectionsInterface) => collection._id == collectionId)} />
}

export default SingleCollectionWrapper