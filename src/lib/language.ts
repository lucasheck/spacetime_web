export interface ILanguageProps {
  language: String;
}

interface ISignIn {
  createAccount?: String;
  saveMemories?: String;
}

interface IProfile {
  salutation?: String;
  logout?: String;
}

interface IHero {
  title?: String;
  abstract?: String;
  button?: String;
}

interface ICopyright {
  paragraph?: String;
}

interface Ierror {}

export function getDictionary(
  language: String,
  component: String
): ISignIn & IProfile & IHero & ICopyright {
  switch (component) {
    case "SignIn":
      const SignInText: ISignIn =
        language === "ptBR"
          ? {
              createAccount: "Crie sua conta",
              saveMemories: " e salve suas memórias!",
            }
          : {
              createAccount: "Create your account",
              saveMemories: " and save your memories!",
            };
      return SignInText;

    case "Profile":
      const ProfileText: IProfile =
        language === "ptBR"
          ? {
              salutation: "Olá",
              logout: "Sair",
            }
          : {
              salutation: "Hi",
              logout: "Logout",
            };
      return ProfileText;
    case "Hero":
      const HeroText: IHero =
        language === "ptBR"
          ? {
              title: "Sua cápsula do tempo",
              abstract:
                "Colecione momentos marcantes da sua jornada e compartilhe (se quiser) com o mundo!",
              button: "CADASTRAR LEMBRANÇA",
            }
          : {
              title: "Your time capsule",
              abstract:
                "Collect memorable moments from your journey and share (if you want) with the world!",
              button: "REGISTER MEMORY",
            };
      return HeroText;
    case "Copyright":
      const CopyrightText: ICopyright =
        language === "ptBR"
          ? {
              paragraph: "Feito com 💜 no NLW da Rocketseat",
            }
          : {
              paragraph: "Made with 💜 at Rocketseat's NLW event",
            };
      return CopyrightText;
    default:
      const Ierror: Ierror = {};
      return Ierror;
  }
}
