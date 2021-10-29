import { Request, Response, NextFunction } from 'express';
import { getMeeting, getMeetingParticipants, getMeetings } from '../backend/courses';
import { ZoomParticipant } from '../class/ZoomMeeting';
import { Action, Card, CardHeader, CardSection, DecoratedText, FormResponse, Grid, GridBorderStyle, GridBorderStyleType, GridItem, HorizontalAlignment, Navigation, OnClick, Render, RenderAction, Widget } from '../components/view';
import { getParams, hasParams, mergeStudents } from '../services/utility';

async function sessions(req: Request, res: Response, next: NextFunction) {
    let params = hasParams(req) ? getParams(req) : null;

    const items: Array<GridItem> = (await getMeetings())
        .map(item => {
            let gridItem: GridItem = {
                id: item.id,
                title: item.user_name,
                subtitle: item.topic,
                textAlignment: HorizontalAlignment.CENTER,
            };
            return gridItem;
        });

    let card = Card.builder()
        .addSection(
            CardSection.builder()
                .addWidget(Widget.builder().setTextInput({
                    name: 'search_session',
                    label: 'Buscar Sesión',
                    onChangeAction: Action.builder().endpoint('sessions')
                        .addParameter('update', 'true')
                        .persist(),
                }))
                .addWidget(
                    Widget.builder().setGrid(
                        Grid.builder().setBorderStyle(
                            GridBorderStyle.builder()
                                .setType(GridBorderStyleType.STROKE)
                                .setCornerRadiues(5)
                        ).onSelect(
                            OnClick.builder().setAction(
                                Action.builder().endpoint('participants')
                            )
                        ).setColumns(1).setItems(items)
                    )
                )
        );
    if (params && params.others.update == 'true') {
        return res.status(200).json(
            FormResponse.builder(
                Render.builder()
                    .setAction(RenderAction.builder().addNavigation(
                        Navigation.builder().update(card)
                    ))
            )
        );
    } else {
        return res.status(200).json(
            Render.builder().setAction(
                RenderAction.builder()
                    .addNavigation(
                        Navigation.builder().push(card)
                    )
            )
        );
    }
}
async function participants(req: Request, res: Response, next: NextFunction) {
    let params;
    let duration = 0;

    if (hasParams(req)) {
        params = getParams(req);
    }

    const meeting = await getMeeting(params?.grid_item_identifier);
    duration = meeting.duration;

    const zoomParticipants = await getMeetingParticipants(params?.grid_item_identifier);

    let totalDuration = (myDuration: number): string => {
        if (!duration) return '-';
        else return `${((100 * myDuration) / duration).toFixed(0)}%`;
    }

    const widgets: Array<Widget> = mergeStudents(zoomParticipants)
        .sort().map((item: ZoomParticipant) => {
            if (item.duration > duration) duration = item.duration;
            return Widget.builder().setDecoratedText(
                DecoratedText.builder()
                    .setTopText(totalDuration(item.duration))
                    .setText(item.name)
            )
        })

    return res.status(200).json(
        FormResponse.builder(
            Render.builder().setAction(
                RenderAction.builder().addNavigation(
                    Navigation.builder().push(
                        Card.builder().addSection(
                            CardSection.builder()
                                .setWidgets(widgets)
                        )
                    )
                )
            )
        )
    );
}

async function home(req: Request, res: Response, next: NextFunction) {
    return res.status(200).json("hola");
}

export default { home, sessions, participants };