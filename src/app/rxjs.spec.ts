import {
    catchError,
    filter,
    finalize,
    first,
    last,
    map,
    max,
    mergeWith,
    Observable,
    of,
    reduce,
    Subject,
    switchMap,
    takeUntil
} from "rxjs";

// https://www.tutorialspoint.com/rxjs/rxjs_quick_guide.htm
describe('RxJS', () => {
    const strings = ['one', 'two', 'three'];
    const observableStrings = of(strings)
    const observableNumbers = of(1, 2, 3, 4, 5)

    describe('creation', () => {

        it('should create observable of type string and assert when completed with finalize', () => {
            let result: Array<String> = [];
            const observer = new Observable<String>(
                function subscribe(subscriber) {
                    try {
                        subscriber.next("one");
                        subscriber.next("two");
                        subscriber.next("three");
                        subscriber.complete();
                    } catch (e) {
                        subscriber.error(e);
                    }
                });

            observer.pipe(
                finalize(() => expect(result).toEqual(strings))
            ).subscribe(next => result.push(next));
        });

    });

    describe('subscription', () => {

        it('should store values to local variable', () => {
            let result: Array<String>;
            observableStrings.subscribe(next => {
                result = next;
                expect(result).toHaveSize(3);
            });
        });

        it('should subscribe until unsubscribed', () => {
            const ngUnsubscribe = new Subject();
            let result: Array<number> = [];
            observableNumbers.pipe(
                takeUntil(ngUnsubscribe),
                finalize(() => expect(result).toEqual([1]))
            ).subscribe(next => {
                // Unsubscribe after first gotten element
                ngUnsubscribe.next(this);
                ngUnsubscribe.complete();

                result.push(next);
            });
        });

        it('should handle error', () => {
            let result: String;
            observableNumbers.pipe(
                map(() => {
                    throw new Error("error");
                }),
                catchError(err => result = err.message),
                finalize(() => expect(result).toEqual("error"))
            ).subscribe(next => next);
        });

    });

    describe('pipe operators', () => {

        it('should pipe with max', () => {
            observableNumbers.pipe(
                max(),
            ).subscribe(next => expect(next).toBe(5));
        });

        it('should pipe with filter', () => {
            let result: Array<number> = [];
            observableNumbers.pipe(
                filter(x => x % 2 === 0), // Filter for even numbers
                finalize(() => expect(result).toEqual([2, 4]))
            ).subscribe(next => result.push(next));
        });

        it('should pipe with reduce summing up numbers', () => {
            let result: number;
            observableNumbers.pipe(
                reduce((x, y) => x + y, 0),
                finalize(() => expect(result).toEqual(15))
            ).subscribe(next => result = next);
        });

        it('should pipe with first', () => {
            let result: number;
            observableNumbers.pipe(
                first(),
                finalize(() => expect(result).toEqual(1))
            ).subscribe(next => result = next);
        });

        it('should pipe with map', () => {
            let result: Array<number> = [];
            observableNumbers.pipe(
                map((value) => value + 1), // Add 1 to every value
                finalize(() => expect(result).toEqual([2, 3, 4, 5, 6]))
            ).subscribe(next => result.push(next));
        });

        it('should pipe with switchMap', () => {
            let result: Array<number> = [];
            observableNumbers.pipe(
                last(),
                switchMap((value) => of(value, value ** 2)), // Return value and value to the power of two
                finalize(() => expect(result).toEqual([5, 25]))
            ).subscribe(next => result.push(next));
        });

        it('should pipe with mergeWith', () => {
            let result: Array<number> = [];
            observableNumbers.pipe(
                mergeWith(of(9)),
                finalize(() => expect(result).toEqual([1, 2, 3, 4, 5, 9]))
            ).subscribe(next => result.push(next));
        });
    });
});
