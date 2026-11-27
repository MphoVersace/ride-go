import { usePreviewAccount } from '../auth/PreviewAccount';
import { Action, AuthLayout, PreviewNotice } from '../ui/AuthLayout';
import RouteArtwork from '../ui/RouteArtwork';
import { enterApp } from '../navigation/routes';

export default function AccountScreen({ navigation }) {
  const { startPreview } = usePreviewAccount();
  function preview(role) {
    startPreview(role);
    enterApp(navigation, role);
  }

  return (
    <AuthLayout
      back={navigation.canGoBack() ? () => navigation.goBack() : undefined}
      title="Welcome to RideGo"
      description="One place to book a ride or get behind the wheel."
    >
      <RouteArtwork variant={0} />
      <Action title="Create an account" onPress={() => navigation.navigate('AccountType')} />
      <Action title="Log in" secondary icon="lock" onPress={() => navigation.navigate('Login')} />
      <PreviewNotice>Trying out the app? Explore either experience with sample data.</PreviewNotice>
      <Action title="Preview as a rider" secondary icon="car" onPress={() => preview('rider')} />
      <Action title="Preview as a driver" secondary icon="compass" onPress={() => preview('driver')} />
    </AuthLayout>
  );
}
