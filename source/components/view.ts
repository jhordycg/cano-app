
export class Render {
    action?: RenderAction;

    static builder() {
        return new Render();
    }
    setAction(action: RenderAction) {
        this.action = action;
        return this;
    }
}

export class RenderAction {
    navigations?: Array<Navigation>;

    static builder() {
        return new RenderAction;
    }

    addNavigation(navigation: Navigation) {
        if (!this.navigations) this.navigations = new Array();
        this.navigations.push(navigation)
        return this;
    }
}

export class Navigation {
    pushCard?: Card;
    updateCard?: Card;
    popCard?: boolean;
    popToCard?: string;

    static builder() {
        return new Navigation;
    }

    push(card: Card) {
        this.pushCard = card;
        return this;
    }

    update(card: Card) {
        this.updateCard = card;
        return this;
    }
}

interface TextInput {
    name?: string;
    label?: string;
    hintText?: string;
    persistValues?: boolean;
    onChangeAction?: Action;
}

export class Button {
    text?: string;
    onClick?: OnClick;

    static builder() {
        return new Button;
    }

    setText(text: string) {
        this.text = text;
        return this;
    }

    setOnClick(action: OnClick) {
        this.onClick = action;
        return this;
    }
}

export class DecoratedText {
    text?: string;
    bottomLabel?: string;
    button?: Button;

    static builder() {
        return new DecoratedText;
    }

    setText(text: string) {
        this.text = text;
        return this;
    }

    setTopText(text: string) {
        this.bottomLabel = text;
        return this;
    }

    setButton(button: Button) {
        this.button = button;
        return this;
    }

}

export class Widget {
    horizontalAlignment?: HorizontalAlignment;
    grid?: Grid;
    textInput?: TextInput;
    decoratedText?: DecoratedText;

    static builder() {
        return new Widget;
    }

    setHorizontalAlignment(alignment: HorizontalAlignment) {
        this.horizontalAlignment = alignment;
        return this;
    }

    setTextInput(textInput: TextInput) {
        this.textInput = textInput;
        return this;
    }

    setGrid(grid: Grid) {
        this.grid = grid;
        return this;
    }

    setDecoratedText(decorated: DecoratedText) {
        this.decoratedText = decorated;
        return this;
    }
}

export class Grid {
    title?: string;
    columnCount?: number;
    borderStyle?: GridBorderStyle;
    items?: Array<GridItem>;
    onClick?: OnClick;

    static builder() {
        return new Grid;
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }

    setColumns(columns: number) {
        this.columnCount = columns;
        return this;
    }

    setItems(items: Array<GridItem>) {
        this.items = items;
        return this;
    }
    addItem(item: GridItem) {
        if (!this.items) this.items = new Array();
        this.items.push(item);
        return this;
    }

    setBorderStyle(borderStyle: GridBorderStyle) {
        this.borderStyle = borderStyle;
        return this;
    }

    onSelect(onClick: OnClick) {
        this.onClick = onClick;
        return this;
    }
}

export class OnClick {
    action?: Action;
    openLink?: any;
    openDynamicLinkAction?: any;
    card?: Card;

    static builder() {
        return new OnClick;
    }

    setAction(action: Action) {
        this.action = action;
        return this;
    }
}

export interface ActionParam {
    key: string;
    value: string;
}

export class Action {
    function?: string;
    parameters?: Array<ActionParam>;
    persistValues?: boolean;

    static builder() {
        return new Action;
    }

    endpoint(name: string) {
        const url: URL = new URL(name, process.env.domain)
        this.function = url.toString();
        return this;
    }

    addParameter(key: string, value: string) {
        if (!this.parameters) this.parameters = new Array();
        this.parameters.push({ key, value })
        return this;
    }

    persist() {
        this.persistValues = true;
        return this;
    }
}

export class GridItem {
    id?: string;
    title?: string;
    subtitle?: string;
    textAlignment?: HorizontalAlignment;
    layout?: GridItemLayout;

}

export enum GridItemLayout {
}

export class Card {
    header?: CardHeader;
    sections?: Array<CardSection>;

    static builder() {
        return new Card;
    }

    setHeader(header: CardHeader) {
        this.header = header;
        return this;
    }

    addSection(section: CardSection) {
        if (!this.sections) this.sections = new Array;
        this.sections.push(section);
        return this;
    }
    setSections(sections: Array<CardSection>) {
        this.sections = sections;
        return this;
    }
}

export class CardSection {
    header?: string;
    widgets?: Array<Widget>;

    static builder() {
        return new CardSection;
    }

    setHeader(header: string) {
        this.header = header;
        return this;
    }

    addWidget(widget: Widget) {
        if (!this.widgets) this.widgets = new Array;
        this.widgets.push(widget);
        return this;
    }
    setWidgets(widgets: Array<Widget>) {
        this.widgets = widgets;
        return this;
    }
}

export class CardHeader {
    title?: string;

    static builder() {
        return new CardHeader;
    }

    setTitle(title: string) {
        this.title = title;
        return this;
    }
}

export enum HorizontalAlignment {
    HORIZONTAL_ALIGNMENT_UNSPECIFIED,
    START, CENTER, END,
}

export class GridBorderStyle {
    cornerRadius?: number;
    type?: GridBorderStyleType;

    static builder() {
        return new GridBorderStyle;
    }

    setCornerRadiues(cornerRadius: number) {
        this.cornerRadius = cornerRadius;
        return this;
    }

    setType(type: GridBorderStyleType) {
        this.type = type;
        return this;
    }
}

export enum GridBorderStyleType {
    STROKE = 'STROKE',
}


export class FormResponse {
    renderActions?: Render;

    constructor(action: Render) {
        this.renderActions = action;
    }
    static builder(action: Render) {
        return new FormResponse(action);
    }
}
