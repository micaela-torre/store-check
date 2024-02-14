import Header from '../components/Header';
import { useApiData } from '../hooks/useApiData';
import { StoresServices } from '../services/stores.services';
import { StoreItem } from '../components/StoreItem';
import { Spinner } from '../components/Spinner';
import { Container } from '../components/Container';
import { PUBLIC_ROUTES } from '../models/routes';

const HomeScreen = ({ navigation }) => {
  const { data, isLoading } = useApiData({ service: StoresServices.getAllStores });

  const handlerGoToStoreDetails = storeId => {
    const chosenStore = data?.find(store => store.id === storeId);
    navigation.navigate(PUBLIC_ROUTES.STORE_DETAILS, { chosenStore });
  };

  return (
    <Container>
      <Header title="Stores List" />
      {isLoading ? (
        <Spinner />
      ) : (
        data?.map(store => <StoreItem key={`store_${store.id}`} goToStore={() => handlerGoToStoreDetails(store.id)} {...store} />)
      )}
    </Container>
  );
};

export default HomeScreen;
