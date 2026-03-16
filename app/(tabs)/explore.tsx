import { Image } from 'expo-image';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from "expo-router";
import { Collapsible } from '@/components/ui/collapsible';
import { ExternalLink } from '@/components/external-link';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Fonts } from '@/constants/theme';

export default function TabTwoScreen() {

  function handleLogout() {
    router.replace("/login");
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="chevron.left.forwardslash.chevron.right"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText
          type="title"
          style={{
            fontFamily: Fonts.rounded,
          }}>
          Explore
        </ThemedText>
      </ThemedView>
      <ThemedText>Market Shop Br é um aplicativo de loja desenvolvido em React Native utilizando Expo.</ThemedText>
      <Collapsible title="Sobre">
        <ThemedText>
           No aplicativo é possível visualizar produtos, acessar os detalhes e adicionar itens ao carrinho.{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> and{' '}
          <ThemedText type="defaultSemiBold">app/(tabs)/explore.tsx</ThemedText>
        </ThemedText>
        <ThemedText>
          The layout file in <ThemedText type="defaultSemiBold">app/(tabs)/_layout.tsx</ThemedText>{' '}
          sets up the tab navigator.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/router/introduction">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Android, iOS, e web suporte">
        <ThemedText>
          Você pode abrir este projeto no Android, iOS e na web. Para abrir a versão web, pressione {' '}
          <ThemedText type="defaultSemiBold">w</ThemedText> no terminal onde o projeto está sendo executado..
        </ThemedText>
      </Collapsible>
      <Collapsible title="Imagem">
        <ThemedText>
          Para imagens estáticas, você pode usar os sufixos <ThemedText type="defaultSemiBold">@2x</ThemedText> e{' '}
          <ThemedText type="defaultSemiBold">@3x</ThemedText> para fornecer arquivos para diferentes densidades de tela.
        </ThemedText>
        <Image
          source={require('@/assets/images/react-logo.png')}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
        />
        <ExternalLink href="https://reactnative.dev/docs/images">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Modos claro e escuro">
        <ThemedText>
          Este modelo oferece suporte aos modos claro e escuro. O recurso {' '}
          <ThemedText type="defaultSemiBold">useColorScheme()</ThemedText> permite inspecionar o esquema de cores&apos;s do usuário e, assim, ajustar as cores da interface de acordo.
        </ThemedText>
        <ExternalLink href="https://docs.expo.dev/develop/user-interface/color-themes/">
          <ThemedText type="link">Learn more</ThemedText>
        </ExternalLink>
      </Collapsible>
      <Collapsible title="Animações">
        <ThemedText>
          Este modelo inclui um exemplo de um componente animado.{' '}
          <ThemedText type="defaultSemiBold">components/HelloWave.tsx</ThemedText> componte usa o poderoso{' '}
          <ThemedText type="defaultSemiBold" style={{ fontFamily: Fonts.mono }}>
            react-native-reanimado
          </ThemedText>{' '}
         Biblioteca para criar uma animação de mão acenando.
        </ThemedText>
        {Platform.select({
          ios: (
            <ThemedText>
              The <ThemedText type="defaultSemiBold">components/ParallaxScrollView.tsx</ThemedText>{' '}
              component provides a parallax effect for the header image.
            </ThemedText>
          ),
        })}
      </Collapsible>
      <Collapsible title="Conta">

      <ThemedText>Sair da aplicação</ThemedText>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <ThemedText style={styles.logoutText}>Logout</ThemedText>
      </TouchableOpacity>
      
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },

  logoutButton: {
    backgroundColor: "#ff4d4d",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
    alignItems: "center"
  },

  logoutText: {
    color: "#fff",
    fontWeight: "bold"
  }

});
