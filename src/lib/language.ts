export interface ILanguageProps {
  language: string;
}

export enum EComponents {
  SignIn = "SignIn",
  Profile = "Profile",
  Hero = "Hero",
  Copyright = "Copyright",
  EmptyMemories = "EmptyMemories",
  NewMemory = "NewMemory",
  NewMemoryForm = "NewMemoryForm",
  EditMemoryForm = "EditMemoryForm",
}

enum ELanguage {
  ptBR = "ptBR",
  en = "en",
}

interface ISignIn {
  createAccount?: string;
  saveMemories?: string;
}

interface IProfile {
  salutation?: string;
  logout?: string;
}

interface IHero {
  title?: string;
  abstract?: string;
  button?: string;
}

interface ICopyright {
  paragraph?: string;
}

interface INewMemory {
  link?: string;
}

interface IMemoryForm {
  mediaPickerInput?: string;
  checkBoxInput?: string;
  dateInput?: string;
  placeHolder?: string;
  buttonGoBack?: string;
  buttonEdit?: string;
  buttonSave?: string;
}

export interface IEmptyMemories {
  paragraph?: string;
  link?: string;
}

export interface IChildren {
  emptyMemories?: {
    paragraph: string;
    link: string;
  };
  memories?: {
    link: string;
  };
}

type IDictionary = ISignIn &
  IProfile &
  IHero &
  ICopyright &
  INewMemory &
  IMemoryForm &
  IChildren;

export function getDictionary(
  language: string,
  component?: EComponents
): IDictionary {
  switch (component) {
    case EComponents.SignIn:
      const SignInText: ISignIn =
        language === ELanguage.ptBR
          ? {
              createAccount: "Crie sua conta",
              saveMemories: " e salve suas memórias!",
            }
          : {
              createAccount: "Create your account",
              saveMemories: " and save your memories!",
            };
      return SignInText;
    case EComponents.Profile:
      const ProfileText: IProfile =
        language === ELanguage.ptBR
          ? {
              salutation: "Olá",
              logout: "Sair",
            }
          : {
              salutation: "Hi",
              logout: "Logout",
            };
      return ProfileText;
    case EComponents.Hero:
      const HeroText: IHero =
        language === ELanguage.ptBR
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
    case EComponents.Copyright:
      const CopyrightText: ICopyright =
        language === ELanguage.ptBR
          ? {
              paragraph: "Feito com 💜 no NLW da Rocketseat",
            }
          : {
              paragraph: "Made with 💜 at Rocketseat's NLW event",
            };
      return CopyrightText;
    case EComponents.NewMemory:
      const NewMemoryText: INewMemory =
        language === ELanguage.ptBR
          ? {
              link: "Voltar à linha do tempo",
            }
          : {
              link: "Back to timeline",
            };
      return NewMemoryText;
    case EComponents.NewMemoryForm:
      const newMemoryFormText: IMemoryForm =
        language === ELanguage.ptBR
          ? {
              mediaPickerInput: "Anexar mídia",
              checkBoxInput: "Tornar memória pública",
              dateInput: "Data da Memória",
              buttonSave: "Salvar",
              placeHolder:
                "Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre.",
            }
          : {
              mediaPickerInput: "Attach media",
              checkBoxInput: "Make public memory",
              dateInput: "Memory date",
              buttonSave: "Save",
              placeHolder:
                "Feel free to add photos, videos and stories about that experience you want to remember forever.",
            };
      return newMemoryFormText;
    case EComponents.EditMemoryForm:
      const editMemoryFormText: IMemoryForm =
        language === ELanguage.ptBR
          ? {
              checkBoxInput: "Tornar memória pública",
              dateInput: "Data da Memória",
              placeHolder:
                "Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre.",
              buttonGoBack: "Voltar",
              buttonEdit: "Editar",
              buttonSave: "Salvar",
            }
          : {
              checkBoxInput: "Make public memory",
              dateInput: "Memory date",
              placeHolder:
                "Feel free to add photos, videos and stories about that experience you want to remember forever.",
              buttonGoBack: "Back",
              buttonEdit: "Edit",
              buttonSave: "Save",
            };
      return editMemoryFormText;
    default:
      if (language === ELanguage.ptBR) {
        const children: IChildren = {
          emptyMemories: {
            paragraph: "Você ainda não registrou nenhuma lembrança, comece a ",
            link: "criar agora",
          },
          memories: {
            link: "Leia mais",
          },
        };
        return children;
      } else {
        const children: IChildren = {
          emptyMemories: {
            paragraph: "You haven't registered any memories yet, start ",
            link: "creating now",
          },
          memories: {
            link: "Read more",
          },
        };
        return children;
      }
  }
}
