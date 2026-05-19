# Agilex Demo1 Pool Index - 2026-05-11 Fourth Wave

- Fourth-wave source zip: `/home/hfd24/Fanding/Reflex/RoboTwin/eval_panel/pi05/Agilex_rollouts/eval_videos_fourth_wave_20260511.zip`
- Pool root: `/home/hfd24/Fanding/Reflex/RoboTwin/eval_panel/pi05/Agilex_demo1_pool`
- Fast preview recipe: `frame_stride=6`, `fps=10`, `scale=0.60`, `beta_view=summary`
- AHS panel: posterior mean with `mean±std` uncertainty over Candidate K
- Incremental support: `--case_ids` is available for future waves
- Total episodes in pool: 65
- Rendered OK: 60
- Not OK / not rendered: 5
- second_wave_20260511: 29 total, 29 rendered OK
- third_wave_20260511: 5 total, 5 rendered OK
- fourth_wave_20260511: 3 total, 3 rendered OK

## Task Summary

| Task | Episodes | Rendered OK | Not OK | Wave2 OK / Total | Wave3 OK / Total | Wave4 OK / Total | AHS view | Per-task index |
|---|---:|---:|---:|---:|---:|---:|---|---|
| `pi05_fold_towels_clean50` | 10 | 9 | 1 | 7 / 7 | 0 / 0 | 0 / 0 | `summary (mean±std)` | [pi05_fold_towels_clean50/_fast_previews/pool_index.md](pi05_fold_towels_clean50/_fast_previews/pool_index.md) |
| `pi05_grab_bread_clean50` | 20 | 20 | 0 | 7 / 7 | 1 / 1 | 3 / 3 | `summary (mean±std)` | [pi05_grab_bread_clean50/_fast_previews/pool_index.md](pi05_grab_bread_clean50/_fast_previews/pool_index.md) |
| `pi05_put_drinks_basket_clean50` | 19 | 18 | 1 | 12 / 12 | 2 / 2 | 0 / 0 | `summary (mean±std)` | [pi05_put_drinks_basket_clean50/_fast_previews/pool_index.md](pi05_put_drinks_basket_clean50/_fast_previews/pool_index.md) |
| `pi05_put_the_duck_in_the_drawer_clean50` | 16 | 13 | 3 | 3 / 3 | 2 / 2 | 0 / 0 | `summary (mean±std)` | [pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/pool_index.md](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/pool_index.md) |

## Episode Matrix

### pi05_fold_towels_clean50

| Episode | Wave | OK | Status | Steps | Replans | Preview | Notes |
|---|---|---:|---|---:|---:|---|---|
| `episode_000000` | first_wave_20260510_or_existing | True | interrupted | 380 | 18 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000000_fast.mp4) |  |
| `episode_000001` | first_wave_20260510_or_existing | True | interrupted | 391 | 17 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000001_fast.mp4) |  |
| `episode_000002` | first_wave_20260510_or_existing | False | None |  |  |  | missing overview.mp4 |
| `episode_000003` | second_wave_20260511 | True | interrupted | 415 | 20 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000003_fast.mp4) |  |
| `episode_000004` | second_wave_20260511 | True | interrupted | 787 | 31 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000004_fast.mp4) |  |
| `episode_000005` | second_wave_20260511 | True | interrupted | 786 | 32 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000005_fast.mp4) |  |
| `episode_000006` | second_wave_20260511 | True | interrupted | 802 | 34 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000006_fast.mp4) |  |
| `episode_000007` | second_wave_20260511 | True | interrupted | 814 | 35 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000007_fast.mp4) |  |
| `episode_000008` | second_wave_20260511 | True | interrupted | 766 | 34 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000008_fast.mp4) |  |
| `episode_000009` | second_wave_20260511 | True | interrupted | 848 | 38 | [mp4](pi05_fold_towels_clean50/_fast_previews/previews/episode_000009_fast.mp4) |  |

### pi05_grab_bread_clean50

| Episode | Wave | OK | Status | Steps | Replans | Preview | Notes |
|---|---|---:|---|---:|---:|---|---|
| `episode_000000` | first_wave_20260510_or_existing | True | interrupted | 837 | 29 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000000_fast.mp4) |  |
| `episode_000001` | first_wave_20260510_or_existing | True | interrupted | 813 | 30 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000001_fast.mp4) |  |
| `episode_000002` | first_wave_20260510_or_existing | True | interrupted | 926 | 34 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000002_fast.mp4) |  |
| `episode_000003` | first_wave_20260510_or_existing | True | interrupted | 945 | 38 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000003_fast.mp4) |  |
| `episode_000004` | first_wave_20260510_or_existing | True | interrupted | 2010 | 76 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000004_fast.mp4) |  |
| `episode_000007` | first_wave_20260510_or_existing | True | interrupted | 2139 | 78 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000007_fast.mp4) |  |
| `episode_000008` | first_wave_20260510_or_existing | True | interrupted | 1148 | 47 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000008_fast.mp4) |  |
| `episode_000009` | first_wave_20260510_or_existing | True | interrupted | 1037 | 41 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000009_fast.mp4) |  |
| `episode_000010` | first_wave_20260510_or_existing | True | interrupted | 1084 | 44 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000010_fast.mp4) |  |
| `episode_000011` | second_wave_20260511 | True | interrupted | 538 | 20 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000011_fast.mp4) |  |
| `episode_000012` | second_wave_20260511 | True | interrupted | 1079 | 44 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000012_fast.mp4) |  |
| `episode_000013` | second_wave_20260511 | True | interrupted | 1140 | 48 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000013_fast.mp4) |  |
| `episode_000014` | second_wave_20260511 | True | interrupted | 1147 | 51 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000014_fast.mp4) |  |
| `episode_000015` | second_wave_20260511 | True | interrupted | 1154 | 42 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000015_fast.mp4) |  |
| `episode_000016` | second_wave_20260511 | True | interrupted | 1016 | 40 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000016_fast.mp4) |  |
| `episode_000017` | second_wave_20260511 | True | interrupted | 845 | 31 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000017_fast.mp4) |  |
| `episode_000018` | third_wave_20260511 | True | interrupted | 1189 | 49 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000018_fast.mp4) |  |
| `episode_000019` | fourth_wave_20260511 | True | interrupted | 646 | 25 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000019_fast.mp4) |  |
| `episode_000020` | fourth_wave_20260511 | True | interrupted | 1358 | 55 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000020_fast.mp4) |  |
| `episode_000021` | fourth_wave_20260511 | True | interrupted | 1260 | 51 | [mp4](pi05_grab_bread_clean50/_fast_previews/previews/episode_000021_fast.mp4) |  |

### pi05_put_drinks_basket_clean50

| Episode | Wave | OK | Status | Steps | Replans | Preview | Notes |
|---|---|---:|---|---:|---:|---|---|
| `episode_000000` | first_wave_20260510_or_existing | True | interrupted | 569 | 19 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000000_fast.mp4) |  |
| `episode_000001` | first_wave_20260510_or_existing | True | interrupted | 1365 | 53 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000001_fast.mp4) |  |
| `episode_000002` | first_wave_20260510_or_existing | True | interrupted | 958 | 39 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000002_fast.mp4) |  |
| `episode_000003` | first_wave_20260510_or_existing | True | interrupted | 794 | 35 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000003_fast.mp4) |  |
| `episode_000004` | first_wave_20260510_or_existing | False | not_rendered |  |  |  | missing episode_data.npz |
| `episode_000005` | second_wave_20260511 | True | interrupted | 1427 | 58 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000005_fast.mp4) |  |
| `episode_000006` | second_wave_20260511 | True | interrupted | 1098 | 46 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000006_fast.mp4) |  |
| `episode_000007` | second_wave_20260511 | True | interrupted | 1043 | 45 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000007_fast.mp4) |  |
| `episode_000008` | second_wave_20260511 | True | interrupted | 586 | 21 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000008_fast.mp4) |  |
| `episode_000009` | second_wave_20260511 | True | interrupted | 784 | 29 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000009_fast.mp4) |  |
| `episode_000010` | second_wave_20260511 | True | interrupted | 713 | 27 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000010_fast.mp4) |  |
| `episode_000011` | second_wave_20260511 | True | interrupted | 1100 | 42 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000011_fast.mp4) |  |
| `episode_000012` | second_wave_20260511 | True | interrupted | 1036 | 45 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000012_fast.mp4) |  |
| `episode_000013` | second_wave_20260511 | True | interrupted | 1183 | 48 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000013_fast.mp4) |  |
| `episode_000014` | second_wave_20260511 | True | interrupted | 1289 | 54 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000014_fast.mp4) |  |
| `episode_000015` | second_wave_20260511 | True | interrupted | 71 | 3 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000015_fast.mp4) |  |
| `episode_000016` | second_wave_20260511 | True | interrupted | 1176 | 45 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000016_fast.mp4) |  |
| `episode_000017` | third_wave_20260511 | True | interrupted | 1368 | 57 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000017_fast.mp4) |  |
| `episode_000018` | third_wave_20260511 | True | interrupted | 1090 | 46 | [mp4](pi05_put_drinks_basket_clean50/_fast_previews/previews/episode_000018_fast.mp4) |  |

### pi05_put_the_duck_in_the_drawer_clean50

| Episode | Wave | OK | Status | Steps | Replans | Preview | Notes |
|---|---|---:|---|---:|---:|---|---|
| `episode_000000` | first_wave_20260510_or_existing | True | interrupted | 876 | 34 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000000_fast.mp4) |  |
| `episode_000001` | first_wave_20260510_or_existing | True | interrupted | 764 | 29 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000001_fast.mp4) |  |
| `episode_000002` | first_wave_20260510_or_existing | True | interrupted | 731 | 33 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000002_fast.mp4) |  |
| `episode_000003` | first_wave_20260510_or_existing | True | interrupted | 1708 | 73 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000003_fast.mp4) |  |
| `episode_000004` | first_wave_20260510_or_existing | False | not_rendered |  |  |  | missing episode_data.npz |
| `episode_000005` | first_wave_20260510_or_existing | True | interrupted | 682 | 28 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000005_fast.mp4) |  |
| `episode_000006` | first_wave_20260510_or_existing | True | interrupted | 829 | 32 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000006_fast.mp4) |  |
| `episode_000007` | first_wave_20260510_or_existing | True | interrupted | 726 | 29 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000007_fast.mp4) |  |
| `episode_000008` | first_wave_20260510_or_existing | False | not_rendered |  |  |  | missing episode_data.npz |
| `episode_000009` | first_wave_20260510_or_existing | True | interrupted | 567 | 23 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000009_fast.mp4) |  |
| `episode_000010` | first_wave_20260510_or_existing | False | not_rendered |  |  |  | missing episode_data.npz |
| `episode_000011` | second_wave_20260511 | True | interrupted | 584 | 27 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000011_fast.mp4) |  |
| `episode_000012` | second_wave_20260511 | True | interrupted | 646 | 32 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000012_fast.mp4) |  |
| `episode_000013` | second_wave_20260511 | True | interrupted | 667 | 28 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000013_fast.mp4) |  |
| `episode_000014` | third_wave_20260511 | True | interrupted | 680 | 28 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000014_fast.mp4) |  |
| `episode_000015` | third_wave_20260511 | True | interrupted | 722 | 36 | [mp4](pi05_put_the_duck_in_the_drawer_clean50/_fast_previews/previews/episode_000015_fast.mp4) |  |
