import React, { Component } from "react"
import moment from "moment"
import humanizeDuration from "humanize-duration"
import { Table, Tag } from "antd"

import { baseUrl } from "../utils/api"

class NextSongsToPlay extends Component {
  constructor() {
    super()
    this.state = {
      json: [],
    }

    fetch(`${baseUrl}/next-songs-to-play`)
      .then((response) => response.json())
      .then((json) =>
        this.setState({
          rows: json.map(({ title, key: keySignature, ...rest }) => ({
            key: Math.random(),
            keySignature,
            title,
            ...rest,
          })),
        })
      )
  }

  render() {
    // TODO: make covers green again

    return (
      <>
        <h1>Songs Performed</h1>

        <Table
          pagination={false}
          dataSource={this.state.rows}
          columns={[
            {
              title: "Name",
              dataIndex: "title",
              key: "title",
              sorter: (a, b) => a.title.localeCompare(b.title),
            },
            {
              title: "Cover",
              dataIndex: "cover",
              key: "cover",
              render: (cover) =>
                cover ? (
                  <Tag color="success">Cover</Tag>
                ) : (
                  <Tag color="processing">Original</Tag>
                ),
              filters: [
                {
                  text: "Cover",
                  value: true,
                },
                {
                  text: "Original",
                  value: false,
                },
              ],
              onFilter: (isCover, song) => song.cover === isCover,
            },
            {
              title: "Plays",
              dataIndex: "count",
              key: "count",
              sorter: (a, b) => parseInt(a.count, 10) - parseInt(b.count, 10),
              defaultSortOrder: "descend",
            },
            {
              title: "Last Played",
              dataIndex: "last_played",
              key: "last_played",
              render: (last_played) =>
                humanizeDuration(
                  moment.duration(moment(last_played).diff(moment())),
                  {
                    units: ["y", "mo", "w", "d"],
                    largest: 2,
                    round: true,
                  }
                ),
              sorter: (a, b) =>
                moment
                  .duration(moment(a.last_played).diff(moment(b.last_played)))
                  .asSeconds(),
            },
          ]}
        />
      </>
    )
  }
}

export default NextSongsToPlay
