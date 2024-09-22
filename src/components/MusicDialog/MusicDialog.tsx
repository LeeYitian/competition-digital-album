import { Icon } from "@iconify/react";
import { CloseButton } from "@/views/autoPlay/AutoPlay.style";
import {
  BackDrop,
  DialogContainer,
  DialogTitle,
  MusicListItem,
  MusicListContainer,
} from "./MusicDialog.style";
import { Dispatch, SetStateAction } from "react";

type TMainMenuProps = {
  setOpenMusicDialog: Dispatch<SetStateAction<boolean>>;
  musicList: { title: string; src: string }[];
  selectedMusic: string;
  setSelectedMusic: Dispatch<SetStateAction<string>>;
  setIsDefaultMusic: Dispatch<SetStateAction<boolean>>;
};
const MusicDialog = ({
  setOpenMusicDialog,
  musicList,
  selectedMusic,
  setSelectedMusic,
  setIsDefaultMusic,
}: TMainMenuProps) => {
  return (
    <BackDrop>
      <DialogContainer>
        <DialogTitle>
          <Icon icon="subway:music" width="2em" />
          <span>音樂設定</span>
        </DialogTitle>
        <CloseButton
          $position="top: -4%;right: -3%;"
          onClick={() => setOpenMusicDialog(false)}
        />
        <MusicListContainer>
          <MusicListItem
            $selected={false}
            onClick={() => {
              setSelectedMusic("");
              setIsDefaultMusic(false);
            }}
          >
            關閉音樂
          </MusicListItem>
          {musicList.map((item) => (
            <MusicListItem
              key={item.title}
              $selected={selectedMusic === item.src}
              onClick={() => {
                setSelectedMusic(item.src);
                setIsDefaultMusic(false);
              }}
            >
              {item.title}
            </MusicListItem>
          ))}
        </MusicListContainer>
      </DialogContainer>
    </BackDrop>
  );
};

export default MusicDialog;
