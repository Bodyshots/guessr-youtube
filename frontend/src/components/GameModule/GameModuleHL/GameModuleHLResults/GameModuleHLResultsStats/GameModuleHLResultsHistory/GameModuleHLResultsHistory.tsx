import { ScrollArea } from '@/components/ui/scroll-area'
import { ProgressConstants } from '@/constants/progresscircle'
import { useAppSelector } from '@/redux/store';

const GameModuleHLResultsHistory = () => {
  const progressCircles = useAppSelector((state) => state.game_persist.progressCircles);
  const videos = useAppSelector((state) => state.game_persist.videos);

  return (
    <div>
      <h4 className="text-sm font-semibold mb-3 text-muted-foreground">
        Guesses History
      </h4>
      <ScrollArea className="h-96 w-full rounded-lg border p-4">
        <div className="flex flex-col gap-4">
          {progressCircles?.map((progressCircle, index) => (
            <div
              key={index}
              className={`p-3 rounded-lg border-l-4 ${progressCircle.highlightColor}`}
            >
              {/* Video Embed */}
              <div className="mb-3 rounded overflow-hidden">
                <iframe
                  width="100%"
                  height="150"
                  src={`https://www.youtube.com/embed/${videos[index].videoId}`}
                  title={videos[index].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>

              {/* Video Title */}
              <p className="text-sm font-medium line-clamp-2 mb-2">
                {videos[index].title}
              </p>

              {/* Guess Info */}
              <div className="flex items-center justify-between">
                <p className="text-xs text-muted-foreground">
                  Guess:
                  <span className="font-semibold">
                    {((typeof progressCircle.guess === "number")
                      ? ((progressCircle.guess > videos[index].viewCount)
                        ? "Higher"
                        : "Lower")
                      : (progressCircle.guess instanceof Date ? progressCircle.guess.toLocaleDateString() : progressCircle.guess)
                    )}
                  </span>
                </p>
                <span
                  className={`text-xs font-bold ${progressCircle.textColor}`}
                >
                  {progressCircle.status === ProgressConstants.CORRECT ? "✓" : "✗"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default GameModuleHLResultsHistory