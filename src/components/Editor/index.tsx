import {
  ContentBlock,
  Editor,
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
} from "draft-js";

interface Props {
  state: EditorState;
  handleFocus?: () => void;
  handleChange?: (state: EditorState) => void;
  isReadOnly?: boolean;
}

const className = "RichEditor-editor";

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

var INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Underline", style: "UNDERLINE" },
  { label: "Monospace", style: "CODE" },
];

const StyleButton = (props: {
  active: boolean;
  label: string;
  onToggle: (style: string) => void;
  style: string;
}) => {
  const onToggle = (e: React.MouseEvent) => {
    e.preventDefault();

    props.onToggle(props.style);
  };

  let className = "RichEditor-styleButton";

  if (props.active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const InlineStyleControls = (props: {
  editorState: EditorState;
  onToggle: (style: string) => void;
}) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const BlockStyleControls = (props: {
  editorState: EditorState;
  onToggle: (style: string) => void;
}) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

const RichTextEditor = ({
  state,
  handleFocus,
  handleChange,
  isReadOnly,
}: Props) => {
  const handleKeyCommand = (command: string, editorState: EditorState) => {
    if (!handleChange) return "not-handled";

    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      handleChange(newState);
      return "handled";
    }

    return "not-handled";
  };

  const mapKeyToEditorCommand = (e: React.KeyboardEvent<{}>) => {
    if (!handleChange) return getDefaultKeyBinding(e);

    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(e, state, 4 /* maxDepth */);

      if (newEditorState !== state) {
        handleChange(newEditorState);
      }

      return "handled";
    }

    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType: string) => {
    if (!handleChange) return "not-handled";

    handleChange(RichUtils.toggleBlockType(state, blockType));

    return "handled";
  };

  const toggleInlineStyle = (inlineStyle: string) => {
    if (!handleChange) return "not-handled";

    handleChange(RichUtils.toggleInlineStyle(state, inlineStyle));

    return "handled";
  };

  const getBlockStyle = (block: ContentBlock): string => {
    switch (block.getType()) {
      case "blockquote":
        return "RichEditor-blockquote";
      default:
        return "";
    }
  };

  const styleMap = {
    CODE: {
      backgroundColor: "rgba(0, 0, 0, 0.05)",
    },
  };

  return (
    <div className="RichEditor-root">
      {isReadOnly ? (
        <Editor editorState={state} readOnly={true} onChange={() => {}} />
      ) : (
        <>
          <BlockStyleControls editorState={state} onToggle={toggleBlockType} />
          <InlineStyleControls
            editorState={state}
            onToggle={toggleInlineStyle}
          />
          <div className={className} onClick={handleFocus}>
            <Editor
              blockStyleFn={getBlockStyle}
              customStyleMap={styleMap}
              editorState={state}
              handleKeyCommand={handleKeyCommand}
              keyBindingFn={mapKeyToEditorCommand}
              onChange={handleChange as any}
              placeholder="Tell a story..."
              spellCheck={true}
              readOnly={isReadOnly}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default RichTextEditor;
