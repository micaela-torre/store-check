import { PUBLIC_ROUTES } from '../models/routes';
import { Spinner } from '../components/Spinner';
import { StoreItem } from '../components/StoreItem';
import { StoresServices } from '../services/stores.services';
import { useApiData } from '../hooks/useApiData';
import { ContainerHeader } from '../components/ContainerHeader';

const HomeScreen = ({ navigation }) => {
  const { data, isLoading } = useApiData({ service: StoresServices.getAllStores });

  const handlerGoToStoreDetails = storeId => {
    const chosenStore = data?.find(store => store.id === storeId);
    navigation.navigate(PUBLIC_ROUTES.STORE_DETAILS, { chosenStore });
  };

  return (
    <ContainerHeader title="Stores List">
      {isLoading ? <Spinner /> : data?.map(store => <StoreItem key={`store_${store.id}`} goToStore={() => handlerGoToStoreDetails(store.id)} {...store} />)}
    </ContainerHeader>
  );
};

export default HomeScreen;
