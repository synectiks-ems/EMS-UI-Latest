import React from 'react';
import { css } from 'emotion';
import { stylesFactory, withTheme, Themeable, Forms } from '@grafana/ui';
import { GrafanaTheme } from '@grafana/data';

interface QueryHistorySettingsProps extends Themeable {
  activeTimeSpan: number;
  activeStarredTab: boolean;
  showActiveDatasourceHistory: boolean;
  hiddenSessions: boolean;
  onChangeActiveTimeSpan: (option: { label: string; value: number }) => void;
  toggleActiveStarredTab: () => void;
  toggleShowActiveDatasourceHistory: () => void;
  toggleHideSessions: () => void;
}

const getStyles = stylesFactory((theme: GrafanaTheme) => {
  return {
    container: css`
      padding-left: ${theme.spacing.sm};
      font-size: ${theme.typography.size.sm};
      .space-between {
        margin-bottom: ${theme.spacing.lg};
      }
    `,
    input: css`
      max-width: 200px;
    `,
    switch: css`
      display: flex;
      align-items: center;
    `,
    label: css`
      margin-left: ${theme.spacing.md};
    `,
  };
});

const timeSpanOptions = [
  { value: 2, label: '2 days' },
  { value: 5, label: '5 days' },
  { value: 1, label: '1 week' },
];

function UnThemedQueryHistorySettings(props: QueryHistorySettingsProps) {
  const {
    theme,
    activeTimeSpan,
    activeStarredTab,
    showActiveDatasourceHistory,
    hiddenSessions,
    onChangeActiveTimeSpan,
    toggleActiveStarredTab,
    toggleShowActiveDatasourceHistory,
    toggleHideSessions,
  } = props;
  const styles = getStyles(theme);
  const selectedOption = timeSpanOptions.find(v => v.value === activeTimeSpan);

  return (
    <div className={styles.container}>
      <Forms.Field
        label="History time span"
        description="Select the period of time for which Grafana will save your query history"
        className="space-between"
      >
        <div className={styles.input}>
          <Forms.Select
            value={selectedOption}
            options={timeSpanOptions}
            onChange={onChangeActiveTimeSpan}
          ></Forms.Select>
        </div>
      </Forms.Field>
      <Forms.Field label="Default active tab" description=" " className="space-between">
        <div className={styles.switch}>
          <Forms.Switch value={activeStarredTab} onChange={toggleActiveStarredTab}></Forms.Switch>
          <div className={styles.label}>Change the default active tab from “Query history” to “Starred”</div>
        </div>
      </Forms.Field>
      <Forms.Field label="Datasource behaviour" description=" " className="space-between">
        <div className={styles.switch}>
          <Forms.Switch value={showActiveDatasourceHistory} onChange={toggleShowActiveDatasourceHistory}></Forms.Switch>
          <div className={styles.label}>Only show queries for datasource currently active in Explore</div>
        </div>
      </Forms.Field>
      <Forms.Field label="Query list options" description=" " className="space-between">
        <div className={styles.switch}>
          <Forms.Switch value={hiddenSessions} onChange={toggleHideSessions}></Forms.Switch>
          <div className={styles.label}>Hide sessions by default</div>
        </div>
      </Forms.Field>
    </div>
  );
}

export const QueryHistorySettings = withTheme(UnThemedQueryHistorySettings);
QueryHistorySettings.displayName = 'QueryHistorySettings';
