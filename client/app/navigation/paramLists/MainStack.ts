import PokemonClass from "../../models/Pokemon";

type MainStackParams = {
  StartScreen: undefined;
  LobbyScreen: { userAvatar: string; opponentAvatar?: string };
  PokemonSelectScreen: undefined;
  BattleScreen: { userTeam: PokemonClass[]; opponentTeam: PokemonClass[] };
  JoinLobbyScreen: undefined;
};

export default MainStackParams;
