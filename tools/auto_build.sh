# -------------------------
# crontab 每个半小时自动编译一次最新代码
# */30 * * * * cd PRJ_ROOT_PATH/tools;bash auto_build.sh >> auto_build.log
# -------------------------
echo START AT: `date +%Y-%m-%dT%H:%M:%S`
ROOT='..'
cd $ROOT
git pull
git status
npm i
npm run build
echo '---------------------------------'
