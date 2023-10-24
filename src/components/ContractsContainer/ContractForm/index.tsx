import styles from "./index.module.scss";

import { Editor, EditorState } from "draft-js";

import "draft-js/dist/Draft.css";
import "../../../assets/styles/RichText.css";

import { useRef } from "react";
import RichTextEditor from "../../Editor";

interface Props {
  name: string;
  setName: (name: string) => void;
  header: string;
  setHeader: (header: string) => void;
  content: EditorState;
  setContent: (content: EditorState) => void;
  contractContent: EditorState;
  setContractContent: (contractContent: EditorState) => void;
  handlePublishContract: () => void;
}

const ContractForm = ({
  name,
  setName,
  header,
  setHeader,
  content,
  setContent,
  contractContent,
  setContractContent,
  handlePublishContract,
}: Props) => {
  const contentEditor = useRef<Editor>(null);
  const contractContentEditor = useRef<Editor>(null);

  const focusContentEditor = () => {
    if (!contentEditor.current) return;

    contentEditor.current.focus();
  };

  const focusContractContentEditor = () => {
    if (!contractContentEditor.current) return;

    contractContentEditor.current.focus();
  };

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleChangeHeader = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHeader(e.target.value);
  };

  return (
    <div className={styles["contract-form"]}>
      <form
        onSubmit={(e) => {
          e.preventDefault();

          handlePublishContract();
        }}>
        <div className={styles["contract-form__input"]}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleChangeName}
          />
        </div>
        <div className={styles["contract-form__input"]}>
          <label htmlFor="header">Header</label>
          <input
            type="text"
            id="header"
            value={header}
            onChange={handleChangeHeader}
          />
        </div>
        <div className={styles["contract-form__input"]}>
          <label htmlFor="content">Content</label>
          <div
            className={`${styles["contract-form__input__editor-wrapper"]} RichEditor-editor`}
            onClick={focusContentEditor}>
            <RichTextEditor
              handleChange={setContent}
              handleFocus={focusContentEditor}
              state={content}
            />
          </div>
        </div>
        <div className={styles["contract-form__input"]}>
          <label htmlFor="contract-content">Contract Content</label>
          <div
            className={`${styles["contract-form__input__editor-wrapper"]} RichEditor-editor`}
            onClick={focusContractContentEditor}>
            <RichTextEditor
              handleChange={setContractContent}
              handleFocus={focusContractContentEditor}
              state={contractContent}
            />
          </div>
          <button
            type="submit"
            className={styles["contract-form__submit-button"]}>
            Publish Contract
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContractForm;
